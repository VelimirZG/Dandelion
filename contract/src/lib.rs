
use std::u128;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet};
use near_sdk::json_types::{U128};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, CryptoHash, PanicOnDefault, Balance};

pub const ONE_NEAR: Balance = 1_000_000_000_000_000_000_000_000;

pub use crate::metadata::*;
pub use crate::create::*;
pub use crate::idea_core::*;


mod metadata;
mod create;
mod internal;
mod views;
mod idea_core;
mod transactions;


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    //contract owner
    pub owner_id: AccountId,

    //keeps track of the idea struct for a given idea ID
    pub ideas_by_id: LookupMap<IdeaId, Idea>,

    //keeps track of all the idea IDs for a given account
    pub ideas_per_owner: LookupMap<AccountId, UnorderedSet<IdeaId>>,

    //keeps track of the idea metadata for a given idea ID
    pub idea_metadata_by_id: UnorderedMap<IdeaId, IdeaMetadata>,

    //keeps track of the metadata for the contract
    pub metadata: LazyOption<IdeaContractMetadata>,

    //keeps track of the investments for the idea
    pub investments: UnorderedMap<IdeaId, u128>,

    //keeps track of the investments goal for the idea
    pub investment_goal: UnorderedMap<IdeaId, Goal>,
}

/// Helper structure for keys of the persistent collections
#[derive(BorshSerialize)]
pub enum StorageKey {
    IdeasById,
    IdeasPerOwner,
    IdeaMetadataById,
    IdeaContractMetadata,
    IdeaPerOwnerInner { account_id_hash: CryptoHash }
}


#[near_bindgen]
impl Contract {
    /*
        initialization function 
    */
    #[init]
    pub fn new_default_meta(owner_id: AccountId) -> Self {
        //calls the other function "new: with some default metadata and the owner_id passed in 
        Self::new(
            owner_id,
            IdeaContractMetadata {
                spec: "Dandelion-1.0.0".to_string(),
                name: "Dandelion contract".to_string(),
            },
        )
    }

    #[init]
    pub fn new(owner_id: AccountId, metadata: IdeaContractMetadata) -> Self {
        //create a variable of type Self with all the fields initialized. 
        let this = Self {
            //Storage keys with the prefixes used for the collections. This helps avoid data collision
            ideas_by_id: LookupMap::new(StorageKey::IdeasById.try_to_vec().unwrap()),
            ideas_per_owner: LookupMap::new(StorageKey::IdeasPerOwner.try_to_vec().unwrap()),
            investments: UnorderedMap::new(b"d"),
            investment_goal: UnorderedMap::new(b"e"),
            idea_metadata_by_id: UnorderedMap::new(
                StorageKey::IdeaMetadataById.try_to_vec().unwrap(),
            ),
            //set the owner_id field equal to the passed in owner_id. 
            owner_id,
            metadata: LazyOption::new(
                StorageKey::IdeaContractMetadata.try_to_vec().unwrap(),
                Some(&metadata),
            ),
        };

        //return the Contract object
        this
    }
}
    