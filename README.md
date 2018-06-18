# Ethereum wallet API - POC
## Setup

 1. install mongodb
 2. npm install ethAPI
 3. npm install userAPI (in utils folder)
 4. start **mongodb** and create a new database called **userAPI**
 5. run userAPI (by default runs on 'localhost:5001')
 6. run ethAPI (by default  runs on 'localhost:5000')

## userAPI
this api serves just as a mock server for a full user management services

user Schema 
 `{"name": "Alice","mnemonic": "mnemonic","defaultAccount": 0}`
 
 1. **GET** /api/user
 2. **GET** /api/user/[user_id]
 3. **POST** /api/user
 4. **PUT** /api/user/[user_id]
 5. **DELETE** /api/user/[user_id]

## ethAPI
this api is intended to work as an ethereum wallet API with no knowledge of ethereum on the frontend.

 1. **GET** /account/[user_id]
 2. **GET** /address/[user_id]
 3. **POST** /transaction
    {
	  "from": sender userId.
	  "to": receiver userId,
      "addressTo": receiver ethereum address
	  "weiAmount": amount in wei to transfer
	}
    
    The transaction can be made directly to an ethereum address(addressTo) or to a userId(to), directly to an address takes priority when both are sent.
 4. **POST** /account/create/[user_id]
