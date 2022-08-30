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
   for example: ```export NEARID=dev-1661410404417-826099944309945```

### Interact with contract

1. **Initialize the contract:**\
   ```near call $NEARID new_default_meta '{"owner_id": "'$NEARID'"}' --accountId $NEARID```
   
2. **Create first idea:**\
```near call $NEARID create_idea '{"idea_id": "Idea 1", "receiver_id": "'$NEARID'", "investment_goal" : 2, "metadata": { "title": "First idea", "description": "This is the first idea that we created.", "picture_url": "https://cdn.pixabay.com/photo/2014/12/29/08/29/lens-582605_960_720.jpg", "team": "John Doe"}}' --accountId $NEARID --deposit 0.1```

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


