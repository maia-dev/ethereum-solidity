
# Table of Contents

1.  [General Knowledge](#org5769d71):general:
    1.  [browser pluggin to handle accounts: metaMask](#orge337318)
    2.  [local test network: Ganache(former TestRPC)](#org1d43c32)
        1.  [Account creation](#orgbb58684)
    3.  [remote test network: Rinkeby](#org86c09d2)
    4.  [javascript testing framework used: mocha](#orga62af67)
2.  [Solidity knowledge](#org5345aae):solidity:
    1.  [solidity compiler: solc](#org7986343)
    2.  [Compiling solidity code results in diferent components:](#org9b6486f)
        1.  [ABI (Application Binary Interface) (abiDefinition):](#org5dcf080)
        2.  [Code (EVM bytecode):](#orge90bae4):ethereum:
        3.  [Other General information about the contract:](#orga6d1b9f)
3.  [Ethereum knowledge](#orgd62a3c7):ethereum:
    1.  [Contract deployment](#org0a28c37)
    2.  [Transaction](#orgcf8b092)
4.  [Blockchain knowledge](#org719ed81):blockchain:
5.  [Cryptocurrency knowledge](#org471ad67):cryptocurrency:
6.  [Glossary](#org59a59dd)
    1.  [ABI:](#orge987853):solidity:
    2.  [Web3:](#org054fffa):blockchain:
        1.  [Web3 0.x.x <- more primitive interface, only callbacks for async code](#org140346c)
        2.  [Web3 1.x.x <- support for promises + async/await](#org7612201)
    3.  [EVM (Ethereum Virtual Machine):](#orgebae256):ethereum:
    4.  [Provider:](#org8ecba48):solidity:blockchain:ethereum:
        1.  [WebsocketProvider](#orgc11c3a9)
        2.  [HttpProvider](#org602e0c8)
        3.  [IpcProvider](#orgc098a67)
    5.  [Smart Contract (also refered as contract):](#org29b135c):ethereum:solidity:
    6.  [Network (as in main vs tests):](#orge1dc03b):ethereum:
7.  [External links](#org25638e7)
    1.  [Ethereum for Web Developers: https://medium.com/@mvmurthy/ethereum-for-web-developers-890be23d1d0c](#org5561c45)
    2.  [Life Cycle of an Ethereum Transaction: https://medium.com/blockchannel/life-cycle-of-an-ethereum-transaction-e5c66bae0f6e](#orgcb46515)


<a id="org5769d71"></a>

# General Knowledge     :general:


<a id="orge337318"></a>

## browser pluggin to handle accounts: metaMask


<a id="org1d43c32"></a>

## local test network: Ganache(former TestRPC)


<a id="orgbb58684"></a>

### Account creation

the Ganache package creates a set of unprotected
accounts that can be used while testing


<a id="org86c09d2"></a>

## remote test network: Rinkeby


<a id="orga62af67"></a>

## javascript testing framework used: mocha


<a id="org5345aae"></a>

# Solidity knowledge     :solidity:


<a id="org7986343"></a>

## solidity compiler: solc


<a id="org9b6486f"></a>

## Compiling solidity code results in diferent components:


<a id="org5dcf080"></a>

### ABI (Application Binary Interface) (abiDefinition):


<a id="orge90bae4"></a>

### Code (EVM bytecode):     :ethereum:

The code that is actualy deployed and executed in the blockchain


<a id="orga6d1b9f"></a>

### Other General information about the contract:

1.  source code

2.  language

3.  language version

4.  compiler version

5.  userDoc

6.  developerDoc


<a id="orgd62a3c7"></a>

# Ethereum knowledge     :ethereum:


<a id="org0a28c37"></a>

## Contract deployment

The bytecode resulting from the compilation of solidity code
can be deployed to the blockchain as a smartcontract


<a id="orgcf8b092"></a>

## TODO Transaction


<a id="org719ed81"></a>

# Blockchain knowledge     :blockchain:


<a id="org471ad67"></a>

# Cryptocurrency knowledge     :cryptocurrency:


<a id="org59a59dd"></a>

# Glossary


<a id="orge987853"></a>

## ABI:     :solidity:

The interface between contracts in the ethereum ecosystem,
both from the outside and contract-to-contract interaction


<a id="org054fffa"></a>

## Web3:     :blockchain:

Library to get programatic access to a deployed contract.
Interacts with a provider, wich in turn interacts with a network


<a id="org140346c"></a>

### Web3 0.x.x <- more primitive interface, only callbacks for async code


<a id="org7612201"></a>

### Web3 1.x.x <- support for promises + async/await


<a id="orgebae256"></a>

## EVM (Ethereum Virtual Machine):     :ethereum:

Is the runtime environment for smart contracts in Ethereum.
It is the fundamental consensus mechanism for Ethereum.


<a id="org8ecba48"></a>

## Provider:     :solidity:blockchain:ethereum:

The communication layer with the blockchain


<a id="orgc11c3a9"></a>

### WebsocketProvider


<a id="org602e0c8"></a>

### HttpProvider


<a id="orgc098a67"></a>

### IpcProvider


<a id="org29b135c"></a>

## Smart Contract (also refered as contract):     :ethereum:solidity:

A computer protocol intended to digitally facilitate, verify
or enforce the negotiation or performance of an arrangement
between two or more parties


<a id="orge1dc03b"></a>

## TODO Network (as in main vs tests):     :ethereum:


<a id="org25638e7"></a>

# External links


<a id="org5561c45"></a>

## Ethereum for Web Developers: <https://medium.com/@mvmurthy/ethereum-for-web-developers-890be23d1d0c>


<a id="orgcb46515"></a>

## Life Cycle of an Ethereum Transaction: <https://medium.com/blockchannel/life-cycle-of-an-ethereum-transaction-e5c66bae0f6e>

