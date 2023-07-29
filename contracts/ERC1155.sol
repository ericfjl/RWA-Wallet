// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";
import "../interfaces/IERC1155.sol";
import "../interfaces/IERC1155Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// import "hardhat/console.sol";

contract ERC1155 is AppStorageFacet, ERC1155StorageFacet, IERC1155, ReentrancyGuard {
    event AddMeta(string metaType, uint tokenId, uint amount, string cid, address createdBy,  address distributor);

    function addMeta(string memory metaType, uint tokenId, uint amount, string memory cid, address payTokenAddress, address distributor) external {
        require((keccak256(abi.encodePacked((metaType))) != keccak256(abi.encodePacked(("OTP")))), 'metaType can not be OTP');
        require(bytes(cid).length > 0, "cid is empty");

        ERC1155FacetStorage storage ds = erc1155Storage();
        require(ds._maxSupplyMap[tokenId] == 0 || ds._maxSupplyMap[tokenId] >= ds._totalSupply[tokenId] + amount, "exceed maxSupply");

        uint totalAmount = ds._basicPriceMap[tokenId] * amount;
        require(totalAmount > 0, 'totalAmount should > 0');
        bool payRz = receivePayment(msg.sender, totalAmount, payTokenAddress);
        require(payRz, "insufficient funds for addMeta");

        _mint(msg.sender, tokenId, amount);

        ds._metasMap[tokenId].push(cid);
        ds._metasKeyByMetaTypeMap[tokenId][metaType].push(cid);

        (address inviter, uint inviterBalanceDelta, uint platformCommissionDelta) = calcCommission(msg.sender, tokenId, totalAmount);

        if (inviter != address(0)) {
            ds._inviterBalanceMap[inviter][payTokenAddress] += inviterBalanceDelta;
        }

        if(distributor != address(0)){
            ds._inviterBalanceMap[distributor][payTokenAddress] += platformCommissionDelta / 2;
            ds.platformCommissionBalance[payTokenAddress] += platformCommissionDelta / 2;
        }else{
            ds.platformCommissionBalance[payTokenAddress] += platformCommissionDelta;
        }

        ds._tokenVaultMap[tokenId][payTokenAddress] += totalAmount - (inviterBalanceDelta + platformCommissionDelta);

        emit AddMeta(metaType, tokenId, amount, cid, msg.sender, distributor);
    }

    event BuyOTP(uint otpForTokenId, uint tokenId, uint amount, string cid, address createdBy, address distributor);
    function buyOTP(uint tokenId, uint amount, string memory cid, address payTokenAddress, address distributor) external {
        require(bytes(cid).length > 0, "cid is empty");

        ERC1155FacetStorage storage ds = erc1155Storage();
        require(ds._maxSupplyMap[tokenId] == 0 || ds._maxSupplyMap[tokenId] >= ds._totalSupply[tokenId] + amount, "exceed maxSupply");
        uint otpForTokenId = ds.otpForTokenIdMap[tokenId];

        uint totalAmount = ds._basicPriceMap[tokenId] * amount;
        require(totalAmount > 0, 'totalAmount should > 0');
        bool payRz = receivePayment(msg.sender, totalAmount, payTokenAddress);
        require(payRz, "insufficient funds for buyOTP");

        _mint(msg.sender, tokenId, amount);

        ds._metasMap[tokenId].push(cid);
        ds._metasKeyByMetaTypeMap[otpForTokenId]['OTP'].push(cid);

        (address inviter, uint inviterBalanceDelta, uint platformCommissionDelta) = calcCommission(msg.sender, tokenId, totalAmount);

        if (inviter != address(0)) {
            ds._inviterBalanceMap[inviter][payTokenAddress] += inviterBalanceDelta;
        }

        if(distributor != address(0)){
            ds._inviterBalanceMap[distributor][payTokenAddress] += platformCommissionDelta / 2;
            ds.platformCommissionBalance[payTokenAddress] += platformCommissionDelta / 2;
        }else{
            ds.platformCommissionBalance[payTokenAddress] += platformCommissionDelta;
        }

        ds._tokenVaultMap[otpForTokenId][payTokenAddress] += totalAmount - (inviterBalanceDelta + platformCommissionDelta);

        emit BuyOTP(otpForTokenId, tokenId, amount, cid, msg.sender, distributor);
    }

    function getTokenShareProfit(uint tokenId, address tokenAddress, address userAddress) external view returns (uint alreadyWithdrawProfit, uint totalCanWithdrawProfit) {
        ERC1155FacetStorage storage ds = erc1155Storage();
        uint nftCount = balanceOf(userAddress, tokenId);
        uint totalShareProfit = ds.tokenShareProfitMap[tokenId][tokenAddress];
        totalCanWithdrawProfit = totalShareProfit * nftCount / ds._maxSupplyMap[tokenId];
        alreadyWithdrawProfit = ds.alreadyWithdrawBalanceMap[userAddress][tokenId][tokenAddress];
    }

    function withdrawTokenShareProfit(uint tokenId, address tokenAddress) external nonReentrant {
        uint nftCount = balanceOf(msg.sender, tokenId);
        require(nftCount > 0, 'You do not have this nft');
        ERC1155FacetStorage storage ds = erc1155Storage();
        uint shareProfit = ds.tokenShareProfitMap[tokenId][tokenAddress];
        require(shareProfit > 0, 'Share profit is zero');

        uint totalCanWithdrawProfit = shareProfit * nftCount / ds._maxSupplyMap[tokenId];
        uint alreadyWithdrawBalance = ds.alreadyWithdrawBalanceMap[msg.sender][tokenId][tokenAddress];
        require(alreadyWithdrawBalance < totalCanWithdrawProfit, 'already withdraw all profit');

        ds.alreadyWithdrawBalanceMap[msg.sender][tokenId][tokenAddress] = totalCanWithdrawProfit;
        uint amount = totalCanWithdrawProfit - alreadyWithdrawBalance;
        IERC20(tokenAddress).transfer(msg.sender, amount);
    }

    function uri(uint tokenID_) public view virtual returns (string memory) {
        ERC1155FacetStorage storage _ds = erc1155Storage();

        string memory _tokenURI = _ds._tokenURIs[tokenID_];
        string memory _base = _ds.baseURI;
        if (bytes(_tokenURI).length == 0) {
            return _base;
        }

        return _tokenURI;
    }

    function totalSupply(uint id_) public view virtual returns (uint) {
        ERC1155FacetStorage storage _ds = erc1155Storage();
        return _ds._totalSupply[id_];
    }

    function exists(uint id_) public view virtual returns (bool) {
        return totalSupply(id_) > 0;
    }

    function balanceOf(address account_, uint id_) public view returns (uint) {
        _requireNonZero(account_);
        ERC1155FacetStorage storage _ds = erc1155Storage();
        return _ds._balances[id_][account_];
    }

    function balanceOfTokensUserAllOwned(
        address account_
    ) public view returns (uint[] memory tokenIdArr, uint[] memory tokenBalanceArr, string[] memory tokenURIArr) {
        _requireNonZero(account_);
        ERC1155FacetStorage storage _ds = erc1155Storage();

        uint lens = _ds._tokenIdOwnedMap[account_].length;
        tokenIdArr = new uint[](lens);
        tokenBalanceArr = new uint[](lens);
        tokenURIArr = new string[](lens);

        tokenIdArr = _ds._tokenIdOwnedMap[account_];

        for (uint i = 0; i < tokenIdArr.length; i++) {
            uint id = tokenIdArr[i];
            tokenBalanceArr[i] = _ds._balances[id][account_];
            tokenURIArr[i] = _ds._tokenURIs[id];
        }
    }

    function balanceOfBatch(address[] calldata accounts_, uint[] calldata ids_) external view returns (uint[] memory) {
        require(accounts_.length == ids_.length, "ERC1155: accounts and ids length mismatch");
        uint[] memory batchBalances = new uint[](accounts_.length);

        for (uint i = 0; i < accounts_.length; ++i) {
            batchBalances[i] = balanceOf(accounts_[i], ids_[i]);
        }

        return batchBalances;
    }

    function setApprovalForAll(address operator_, bool approved_) external {
        _setApprovalForAll(msg.sender, operator_, approved_);
    }

    function isApprovedForAll(address account_, address operator_) public view returns (bool) {
        ERC1155FacetStorage storage _ds = erc1155Storage();
        return _ds._operatorApprovals[account_][operator_];
    }

    function safeTransferFrom(address from_, address to_, uint id_, uint amount_, bytes calldata data_) external {
        _requireAuth(from_);
        _safeTransferFrom(from_, to_, id_, amount_, data_);
    }

    function safeBatchTransferFrom(address from_, address to_, uint[] calldata ids_, uint[] calldata amounts_, bytes calldata data_) external {
        _requireAuth(from_);
        _safeBatchTransferFrom(from_, to_, ids_, amounts_, data_);
    }

    function _setApprovalForAll(address owner_, address operator_, bool approved_) private {
        require(owner_ != operator_, "ERC1155: Cannot set approval status for self");
        ERC1155FacetStorage storage _ds = erc1155Storage();
        _ds._operatorApprovals[owner_][operator_] = approved_;

        emit ApprovalForAll(owner_, operator_, approved_);
    }

    function _safeTransferFrom(address from_, address to_, uint id_, uint amount_, bytes memory data_) private {
        _transfer(from_, to_, id_, amount_);

        emit TransferSingle(msg.sender, from_, to_, id_, amount_);
        _requireReciever(from_, to_, id_, amount_, data_);
    }

    function _safeBatchTransferFrom(address from_, address to_, uint[] memory ids_, uint[] memory amounts_, bytes memory data_) private {
        require(amounts_.length == ids_.length, "ERC1155: accounts and ids length mismatch");

        for (uint _i = 0; _i < amounts_.length; ++_i) {
            _transfer(from_, to_, ids_[_i], amounts_[_i]);
        }

        emit TransferBatch(msg.sender, from_, to_, ids_, amounts_);
        _requireBatchReciever(from_, to_, ids_, amounts_, data_);
    }

    function _transfer(address from_, address to_, uint id_, uint amount_) private {
        _requireNonZero(to_);
        _requireBalance(from_, id_, amount_);
        ERC1155FacetStorage storage _ds = erc1155Storage();
        _ds._balances[id_][from_] -= amount_;
        _ds._balancesMap[from_][id_] -= amount_;
        _ds._balances[id_][to_] += amount_;
        _ds._balancesMap[to_][id_] += amount_;
        if (!_isExistInArr(_ds._tokenIdOwnedMap[to_], id_)) {
            _ds._tokenIdOwnedMap[to_].push(id_);
        }
    }

    function _mint(address to_, uint id_, uint amount_) internal virtual {
        _mint(to_, id_, amount_, "");
    }

    function _isExistInArr(uint[] memory arr, uint id) internal virtual returns (bool) {
        for (uint i; i < arr.length; i++) {
            if (id == arr[i]) {
                return true;
            }
        }
        return false;
    }

    function _mint(address to_, uint id_, uint amount_, bytes memory data_) internal virtual {
        _requireNonZero(to_);

        ERC1155FacetStorage storage _ds = erc1155Storage();
        address tokenOwner = _ds._tokenOwnerMap[id_];
        _requireNonZero(tokenOwner); // means the token isn't created yet!!!!

        _ds._totalSupply[id_] += amount_;
        _ds._balances[id_][to_] += amount_;
        _ds._balancesMap[to_][id_] += amount_;
        if (!_isExistInArr(_ds._tokenIdOwnedMap[to_], id_)) {
            _ds._tokenIdOwnedMap[to_].push(id_);
        }

        emit TransferSingle(msg.sender, address(0), to_, id_, amount_);

        _requireReciever(address(0), to_, id_, amount_, data_);
    }

    function _requireAuth(address account_) private view {
        require(account_ == msg.sender || isApprovedForAll(account_, msg.sender), "ERC1155: caller is not token owner or approved");
    }

    function _requireNonZero(address account_) private pure {
        require(account_ != address(0), "ERC1155: address zero is not a valid owner");
    }

    function _requireBalance(address account_, uint id_, uint amount_) private view {
        ERC1155FacetStorage storage _ds = erc1155Storage();
        require(_ds._balances[id_][account_] >= amount_, "ERC1155: Insufficient balance");
    }

    function _requireReciever(address from_, address to_, uint tokenID_, uint amount_, bytes memory data_) private {
        require(_checkOnERC1155Received(from_, to_, tokenID_, amount_, data_), "ERC1155: transfer to non ERC1155Receiver implementer");
    }

    function _requireBatchReciever(address from_, address to_, uint[] memory tokenIDs_, uint[] memory amounts_, bytes memory data_) private {
        require(_checkOnERC1155BactchReceived(from_, to_, tokenIDs_, amounts_, data_), "ERC1155: transfer to non ERC1155Receiver implementer");
    }

    function _hasContract(address account_) private view returns (bool) {
        return account_.code.length > 0;
    }

    function _checkOnERC1155Received(address from_, address to_, uint tokenID_, uint amount_, bytes memory data_) private returns (bool) {
        if (_hasContract(to_)) {
            try IERC1155Receiver(to_).onERC1155Received(msg.sender, from_, tokenID_, amount_, data_) returns (bytes4 retval) {
                return retval == IERC1155Receiver.onERC1155Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC1155: transfer to non ERC1155Receiver implementer");
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    function _checkOnERC1155BactchReceived(
        address from_,
        address to_,
        uint[] memory tokenIDs_,
        uint[] memory amounts_,
        bytes memory data_
    ) private returns (bool) {
        if (_hasContract(to_)) {
            try IERC1155Receiver(to_).onERC1155BatchReceived(msg.sender, from_, tokenIDs_, amounts_, data_) returns (bytes4 retval) {
                return retval == IERC1155Receiver.onERC1155Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC1155: transfer to non ERC1155Receiver implementer");
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }
}
