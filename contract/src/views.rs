use crate::*;

#[near_bindgen]
impl Contract {

//Query for all the ideas for an owner
pub fn ideas_for_owner(
    &self,
    account_id: AccountId,
    from_index: Option<U128>,
    limit: Option<u64>,
    
) -> Vec<JsonIdea> {
    
    //get the set of ideas for the passed in owner
    let ideas_for_owner_set = self.ideas_per_owner.get(&account_id);
    //if there is some set of ideas, we'll set the ideas variable equal to that set
    let ideas = if let Some(ideas_for_owner_set) = ideas_for_owner_set {
        ideas_for_owner_set
    } else {
        //if there is no set of ideas, we'll simply return an empty vector. 
        return vec![];
    };
    //where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
    let start = u128::from(from_index.unwrap_or(U128(0)));

    //iterate through the keys vector
    ideas.iter()
        //skip to the index we specified in the start variable
        .skip(start as usize) 
        //take the first "limit" elements in the vector. If we didn't specify a limit, use 50
        .take(limit.unwrap_or(50) as usize) 
        //we'll map the idea IDs which are strings into Json Ideas
        .map(|idea_id| self.idea_info(idea_id.clone()).unwrap())
        //since we turned the keys into an iterator, we need to turn it back into a vector to return
        .collect()
}

}


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Investment {
  pub idea_id: IdeaId, 
  pub total_amount: U128,
}

#[near_bindgen]
impl Contract {
  // Public - get investment by account ID
  pub fn get_investment_for_idea(&self, idea_id: IdeaId) -> Investment {
    Investment {
      idea_id: idea_id.clone(),
      total_amount: U128(self.investments.get(&idea_id).unwrap_or(0))
    }
  }

    // Public - get total number of investments
    pub fn total_investments(&self) -> u64 {
        self.investments.len()
    }

    // Public - paginate through all investments on the contract
    pub fn get_investments(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<Investment> {
        //where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
        let start = u128::from(from_index.unwrap_or(U128(0)));

        //iterate through investment
        self.investments.keys()
          //skip to the index we specified in the start variable
          .skip(start as usize) 
          //take the first "limit" elements in the vector. If we didn't specify a limit, use 50
          .take(limit.unwrap_or(50) as usize) 
          .map(|ideas| self.get_investment_for_idea(ideas))
          //since we turned map into an iterator, we need to turn it back into a vector to return
          .collect()
    }

    }