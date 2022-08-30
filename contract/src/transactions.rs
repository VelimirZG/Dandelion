use crate::*;
use near_sdk::json_types::U128;
use near_sdk::{env, log, near_bindgen, Balance, Promise};

pub const STORAGE_COST: u128 = 1_000_000_000_000_000_000_000;


#[near_bindgen]
impl Contract {
  

  #[payable] 
  pub fn invest(&mut self, idea_id:IdeaId) -> U128 {
    // Get who is calling the method and how much $NEAR they attached
    
    let investment_amount: Balance = env::attached_deposit();//important, input is prepared for NEAR and later exchanged for yoctoNEAR
    let idea_check=&idea_id;

    assert!(self.idea_info(idea_check.to_string()).is_some(), "There is no such idea");

    let mut invested_so_far = self.investments.get(&idea_id).unwrap_or(0);

    let _to_transfer: Balance = if invested_so_far == 0 {
      // This is the user's first investment, lets register it, which increases storage
      assert!(investment_amount > STORAGE_COST, "Attach at least {} yoctoNEAR", STORAGE_COST);

      // Subtract the storage cost to the amount to transfer
      investment_amount - STORAGE_COST
    }else{
      investment_amount
    };

    // Persist in storage the amount invested so far
    invested_so_far += investment_amount;
    self.investments.insert(&idea_id, &invested_so_far);

    // Send the money to the owner of the Idea if the goal has been reached
    if invested_so_far >= (&self.investment_goal.get(&idea_id).unwrap()*ONE_NEAR){
      Promise::new(self.owner_id.clone()).transfer(invested_so_far);
      log!("Investment goal for {} has been reached! You invested a total of {}", idea_id.clone(), invested_so_far);
    }
    
    log!("Thank you for investing to {}! Total invested so far: {}", idea_id.clone(), invested_so_far);
    

    U128(invested_so_far)
  }
}

