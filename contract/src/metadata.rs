use crate::*;
pub type IdeaId = String;
pub type TransactionId = String;
pub type InvestorId = String;
pub type Goal= u128;
pub type Tag=String;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Idea {
    //owner of the idea
    pub owner_id: AccountId, 
}



//The Json idea is what will be returned from view calls. 
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
#[derive(Debug)]
pub struct JsonIdea {
    //idea ID
    pub idea_id: IdeaId,
    //owner of the idea
    pub owner_id: AccountId,
    // pub tag:Tag,
    //idea metadata
    pub metadata: IdeaMetadata,
   
}
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonTags {
    //idea ID
    pub idea_id: IdeaId,
    //owner of the idea
    // pub tags: Tag,
   
}


#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct IdeaContractMetadata {
    pub spec: String,              // required, essentially a version like "Dandelion-1.0.0"
    pub name: String,              // required, ex. "Dandelion"
    
}



#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
#[derive(Debug)]
pub struct IdeaMetadata {
    pub title: Option<String>, // ex. "Teleportal" or "Future bank"
    pub description: Option<String>, // free-form description
    pub competitors: Option<String>,
    pub value_proposition: Option<String>, // unique value proposition
    pub tags:Option<Vec<String>>,
    pub team:Option<String>,
    pub picture_url: Option<String>,
 
    
    //pub market_need: Option<String>,

}

