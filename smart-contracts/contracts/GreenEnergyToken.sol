// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StandardERC20.sol";

/// @title Green Energy Token Contract
/// @author BlockExplorers
/// @notice This token is used in tokenize the energy assest from green energy producer
/// @dev Implements the ERC20 Contract
contract GreenEnergyToken is StandardERC20{

    // State variable to track the company's footprint
    mapping(address => uint) footprintGenerated;
    
    // State variable to track the company's iot address
    mapping(address=>address) approvedIot;
    
    // Address of the contract owner
    address public owner;
    
    /// @notice Constructor of contract
    /// @dev used to initilaze the Token metadata and Inital supply
    constructor() StandardERC20("Green Energy Token", "GET", 100000000000000000000){
        owner = msg.sender;
    }

    /// @notice Modifier used to restrict the permission to the owner of the contract.
    /// @dev restricts the funtionality to owner
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    /// @notice Modifier used to restrict the permission to the owner of the contract.
    /// @dev restricts the functionality to IOT address
    /// @param company address of the buyer
    modifier onlyIOT(address company){
        require(msg.sender == approvedIot[company]);
        _;
    }

    /// @notice To generate Event for Buy Action
    /// @dev Buy Event defiinition
    /// @param to address of the buyer
    /// @param amount amount of tokens requested to be bought
    event Buy(address indexed to, uint indexed footPrint, uint indexed amount);

    /// @notice To generate Event for Compensate Action
    /// @dev Compensate Event defiinition
    /// @param to address of the Token holder(company)
    /// @param amount amount of tokens requested to be compensated
    event Compensate(address indexed to, uint indexed footPrint, uint indexed amount);

    /// @notice Create new tokens and store it in smart contract
    /// @dev calls the _mint function from standard ERC20
    /// @param amount specifies the amount of token to be newly minted
    function mint(uint amount) public onlyOwner{
        _mint(address(this), amount);
    }

    /// @notice Function to add the footprint generated by company to the contract state
    /// @param company address of the company 
    /// @param footprint units of footprint generated by the company 
    function addFootprint(address company,uint footprint) public onlyIOT(company){
        footprintGenerated[company] += footprint;
    }
    
    /// @notice Obtain the total footprint of the company
    /// @dev utility function to access the state of the company
    /// @param company address of the company
    /// @return returns the total units of footprint generated by the company
    function getFootPrint(address company) public view returns(uint){
        return footprintGenerated[company];
    }

    /// @notice Facilitate the user to buy tokens
    /// @dev uses StandardERC20 _transfer function
    /// @param amount amount of tokens to be bought by the user
    function buy(uint amount)public payable{
        require(msg.value == amount);
        _transfer(address(this), msg.sender,amount);
        emit Buy(msg.sender,footprintGenerated[msg.sender],amount);
    }

    /// @notice Retrieve the address of the IOT Device of a company
    /// @dev Returns the address of the IOT dec
    /// @param company address of the company
    /// @return address of the IOT device approved by the company
    function getIOT(address company) public view returns(address){
        return approvedIot[company];
    }

    /// @notice Facilitate the user to compensate for the generated footprints
    /// @dev burns the specified amount of tokens
    /// @param amount amount of tokens the company wants to compensate
    function compensate(uint amount) public{        
        require(balanceOf(msg.sender)>= amount);
        _burn(msg.sender,amount);
        footprintGenerated[msg.sender] -=amount;
        emit Compensate(msg.sender,amount, amount);
    }

    /// @notice Approve an IOT device for the company
    /// @dev Should be executed before adding footprint
    /// @param spender address of the IOT device
    function approveIot(address spender) public{
        bool isApproved = approve(spender,getFootPrint(msg.sender));
        if(isApproved)
            approvedIot[msg.sender]=spender;
    }
    
    /// @notice Change the ownership of contract
    /// @dev Function to change the owner of the contract
    /// @param newOwner address of the new owner
    function changeOwner(address newOwner) public returns(bool){
        require(owner == msg.sender);
        owner = newOwner;
        return true;
    }
}