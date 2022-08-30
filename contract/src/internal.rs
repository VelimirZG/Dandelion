use crate::*;

pub(crate) fn hash_account_id(account_id: &AccountId) -> CryptoHash {
    //get the default hash
    let mut hash = CryptoHash::default();
    //we hash the account ID and return it
    hash.copy_from_slice(&env::sha256(account_id.as_bytes()));
    hash
}

impl Contract {
    //add a idea to the set of ideas an owner has
    pub(crate) fn internal_add_idea_to_owner(
        &mut self,
        account_id: &AccountId,
        idea_id: &IdeaId,
    ) {
        //get the set of ideas for the given account
        let mut ideas_set = self.ideas_per_owner.get(account_id).unwrap_or_else(|| {
            //if the account doesn't have any ideas, we create a new unordered set
            UnorderedSet::new(
                StorageKey::IdeaPerOwnerInner {
                    //we get a new unique prefix for the collection
                    account_id_hash: hash_account_id(&account_id),
                }
                .try_to_vec()
                .unwrap(),
            )
        });

        //we insert the idea ID into the set
        ideas_set.insert(idea_id);

        //we insert that set for the given account ID. 
        self.ideas_per_owner.insert(account_id, &ideas_set);
    }

   }