use crate::*;
//use near_sdk::{ext_contract, log, Gas, PromiseResult};

pub trait IdeaCore {
   //get information about the idea passed in
   fn idea_info(&self, idea_id: IdeaId) -> Option<JsonIdea>;
}

#[near_bindgen]
impl IdeaCore for Contract {


    //get the information for a specific idea ID
    fn idea_info(&self, idea_id: IdeaId) -> Option<JsonIdea> {
        //if there is some idea ID in the ideas_by_id collection
        if let Some(idea) = self.ideas_by_id.get(&idea_id) {
            //get the metadata for that idea
            let metadata = self.idea_metadata_by_id.get(&idea_id).unwrap();
            //return the JsonIdea (wrapped by Some since we return an option)
            Some(JsonIdea {
                idea_id,
                owner_id: idea.owner_id,
                // tag:idea.tag,
                metadata,
            })
        } else { //if there wasn't an idea ID in the ideas_by_id collection,  return None
            None
        }
    }


}
