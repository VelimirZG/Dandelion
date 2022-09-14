//use near_sdk::log;
use near_sdk::Balance;
use crate::*;


#[near_bindgen]
impl Contract {
    #[payable]
    pub fn create_idea(
        &mut self,
        idea_id: IdeaId,
        metadata: IdeaMetadata,
        owner_id: AccountId,  
        investment_goal: Balance,
        // tag:Tag,
        
    ) {
        //measuring the initial storage being used on the contract
        let initial_storage_usage = env::storage_usage();



        //specify the idea struct that contains the owner ID 
        let idea = Idea {
            //set the owner ID equal to the receiver ID passed into the function
            owner_id: owner_id,
        };

        //insert the idea ID and idea struct and make sure that the idea doesn't exist
        assert!(
            self.ideas_by_id.insert(&idea_id, &idea).is_none(),
            "Idea already exists"
        );

        //insert the idea ID and metadata
        self.idea_metadata_by_id.insert(&idea_id, &metadata);


        //insert the investment goal for the idea
        self.investment_goal.insert(&idea_id, &investment_goal);

        //call the internal method for adding the idea to the owner
        self.internal_add_idea_to_owner(&idea.owner_id, &idea_id);

       

        // self.internal_add_tag_to_idea(&idea_id, &tag);

        //calculate the required storage which was the used - initial
        let _required_storage_in_bytes = env::storage_usage() - initial_storage_usage;

        //(TODO)refund any excess storage if the user attached too much. Panic if they didn't attach enough to cover the required.
        //refund_deposit(required_storage_in_bytes);
    }

    // pub fn add_tag(&mut self,
    //     idea_id: IdeaId,
    //     tag:Tag,){
    //         self.internal_add_tag_to_idea(&idea_id, &tag);  
      
    //   }

    pub fn add_like_to_idea (&mut self, account: AccountId, idea_id: IdeaId,){
        self.internal_add_liked_idea_to_account(&account, &idea_id);
    }

}