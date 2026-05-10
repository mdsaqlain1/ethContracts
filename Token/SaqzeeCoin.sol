// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SaqzeeCoin {
    event Transfer(address indexed from, address indexed to, uint value); 
    event Approval(address indexed owner, address indexed spender, uint value);

    address public owner;
    uint public tokenSupply = 0;
    mapping (address => uint) public balances;
    mapping (address => mapping(address => uint)) public allowances;

    string public coinName = "Saqzee";
    string public symbol = "SQZ";

    constructor(){
        owner = msg.sender;
    }

    function mint(uint _amt) public {
        require(msg.sender == owner);
        tokenSupply += _amt;
        balances[msg.sender] += _amt;
        emit Transfer(address(0), msg.sender, _amt);
    } 

    function mintTo (address _to, uint _value) public {
        require(msg.sender == owner);
        balances[_to] += _value;
        tokenSupply += _value;
        emit Transfer(address(0), _to, _value);
    }

    function burn(uint _amt) public {
        require(_amt <= balances[msg.sender]);
        balances[msg.sender] -= _amt;
        tokenSupply -= _amt;
        emit Transfer(msg.sender, address(0), _amt);
    }

    function transfer(address _to, uint _amt) public {
        require(balances[msg.sender] >= _amt);
        balances[msg.sender] -= _amt;
        balances[_to] += _amt;
        emit Transfer(msg.sender, _to, _amt);
    }

    function transferFrom(address _to, address _from, uint _amt) public {
        uint allowanceAmt = allowances[_from][msg.sender];
        require(allowanceAmt >= _amt);

        require(balances[_from] >= _amt);

        balances[_from] -= _amt;
        balances[_to] += _amt;
        allowances[_from][msg.sender] -= _amt;
        emit Transfer(_from, _to, _amt);
    }

    function approve(address _spender, uint _amt) public returns (bool) {
        allowances[msg.sender][_spender] = _amt;
        emit Approval(msg.sender, _spender, _amt);
        return true;
    }
}
