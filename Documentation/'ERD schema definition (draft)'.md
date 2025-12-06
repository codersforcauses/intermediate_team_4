// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  user_id integer [primary key]
  username varchar
  email string 
  password string 
  created_at datetime
  rating int 
}

Table organisations {
  organisation_id integer [primary key]
  owner integer [ref: - users.user_id] 
  created_at timestamp
}

Table members { 
  user_id integer [ref: - users.user_id] 
  organisation_id integer [ref: - organisations.organisation_id]
  created_at timestamp 
} 

Table Inventory {
  item_id integer [primary key]
  owner integer [ref: - organisations.organisation_id]
  name varchar 
  description text 
  quantity integer [not null]
  available boolean
}

Table Loaned { 
  transaction_id integer [primary key]
  lender integer [ref: - organisations.organisation_id]
  borrower integer [ref: - users.user_id]
  item integer [ref: - Inventory.item_id]
  loan_start datetime 
  loan_end datetime 

}













