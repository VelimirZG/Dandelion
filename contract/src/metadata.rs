use crate::*;
pub type IdeaId = String;
pub type TransactionId = String;
pub type InvestorId = String;
pub type Goal= u128;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Idea {
    //owner of the idea
    pub owner_id: AccountId, 
}



//The Json idea is what will be returned from view calls. 
#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct JsonIdea {
    //idea ID
    pub idea_id: IdeaId,
    //owner of the idea
    pub owner_id: AccountId,
    //idea metadata
    pub metadata: IdeaMetadata,
   
}


#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct IdeaContractMetadata {
    pub spec: String,              // required, essentially a version like "Dandelion-1.0.0"
    pub name: String,              // required, ex. "Dandelion"
    
}



#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct IdeaMetadata {
    pub title: Option<String>, // ex. "Teleportal" or "Future bank"
    pub description: Option<String>, // free-form description
    pub competitors: Option<String>,
    pub value_proposition: Option<String>, // unique value proposition
    pub tags:Option<String>,
    pub team:Option<String>,
    pub picture_url: Option<String>,
    pub reach: Option<u64>,
    pub impact: Option<u8>,
    pub confidence: Option<u8>,
    pub effort:Option<u16>,
    //pub market_need: Option<String>,

}