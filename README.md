Dandelion
==================

This repository contains an implementation of the main contract of Dandelion app. 

### Prerequisits
In order to interact with smart contract, first it needs to be deployed. 

1. Clone this repo locally\
       ```git clone https://github.com/VelimirZG/Dandelion.git```
2. Change directory to Dandelion\
       ```cd dandelion```
2. Install dependencies\
       ```yarn install```\
       ```yarn build```
3. Deploy the contract\
   ```near dev-deploy -f --wasmFile out/main.wasm```

Once we have contract deployed, use the Account ID where it was deployed to set an environment variable to make it easy to copy and paste(alternatively you can use your own account ID):

export NEARID=AccountID\
   for example: ```export NEARID=dev-1661857720366-11013681566272```

### Interact with contract

1. **Initialize the contract:**\
   ```near call $NEARID new_default_meta '{"contract_owner_id": "'$NEARID'"}' --accountId $NEARID```
   
2. **Create first idea:**\
```near call $NEARID create_idea '{"idea_id": "125", "owner_id": "'$NEARID'","investment_goal": 500, "metadata": { "title": "Blockchain game characters", "description": "Building a blockchain character ecosytem", "picture_url": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "team": "John Doe", "tags":["economy","games", "ecosystem"], "competitors":"Steam","value_proposition":"blockchain based platform"}}' --accountId $NEARID --deposit 0.1```

3. **View idea info**\
```near view $NEARID idea_info '{"idea_id": "Idea 1"}'```

4. **View ideas per creator**\
```near view $NEARID ideas_for_owner '{"account_id": "'$NEARID'"}'```

5. **Invest in idea**\
```near call $NEARID invest '{"idea_id":"Idea 1"}' --accountId $NEARID --deposit 0.1```

6. **Check how much is invested in idea**\
```near call $NEARID get_investment_for_idea '{"idea_id":"Idea 1"}' --accountId $NEARID```

7. **View all investments**\
```near view $NEARID get_investments```

8. **View total number of investments**\
```near view $NEARID total_investments```

9. **View investment goal**\
```near view $NEARID get_investment_goal '{"idea_id":"Idea 1"}'```

10. **View all ideas**\
```near view $NEARID get_all_ideas```


