NoSQL -- Data Design
--------------------

Basic
-----

1. 
// User document object


{  # outer shell 
  {
  "id": 1,                      # numeric, sequential
  "user_name": "foobar1",       # alphabetic
  "visiblity": "yes" or no      # test ("yes" or "no")
    {
    "birthday": "04-24",        # date (format mm-dd)
    "gender" : "male",          # text ("male" or "female")
    "phone" : "234-456-5678",   # text (format ddd-ddd-dddd)
    "location": {               # nested
      "city" : "city_name",     # text 
      "state" : "state_name",   # text (format uppercase, 
                                        2 alpha chars from list)
      "country" : "country_name"  # text (from list)
    }
  "personal_information": "cgfjhvhkjb"  # text

  },

  { 
  .......
  }

}

Intermediate
------------

1.

// Reservations document object

{ # outer shell

  {
  "id": 1,                      # numeric, sequential
  "user_name": "foobar1",       # alphabetic
  "number guests": 99,           # numeric (2 digits)
  "table": 99,                   # numeric (2 digits)
  "time_from": hh:mm,           # time (format hh:mm ... 
                                #   hh in [defined eg 06-10] (pm)
                                #   mm in {00, 15, 30, 45]  )
  "time_until": hh:mm,          # time (format hh:mm ... 
                                #   hh in [defined eg 06-10] (pm)
                                #   mm in {00, 15, 30, 45]  )      
  },

  { 
  .......
  }
                            
}

// Available_Times index table document object

{ # outer shell

  {
  "time": [06:00, 06:15, 06:30, ... ],
                                # time (format hh:mm ... 
                                #   hh in [defined eg 06-10] (pm)
                                #   mm in {00, 15, 30, 45]  )
                                # example given ...
  # alt: plain seq index numbers (id's) representing 15 min slots coupled with Times document object containing id's and times for conversion
  # As reservations are made, available times added to reservation doc and deleted from available_times doc. And when reservations are cancelled, available times added back to available_times from deleted reservation doc. 
  },


  { 
  .......
  }
                            
}

2. 


// Student document object

{ # outer shell

  {
  "student_id": 9999999,          # numeric or alphanumeric text 
  "login": "XXXXXXXXX",           # alphanumeric, not visible
    {
    "semester": "XXXXXX",         # alphanumeric; 
                                  # could be combined with year
      {
      [{
       "class_id": "XXXXXX",      # alphanumeric, fixed # of chars
       "grade": "X",              # alphanumeric, in ["A", "B", ...]
       },
       {
         ... class data
       },
       {
         ... class data
       }]
    },
    {
      .... semester data 
    },
    {
      .... semester data 
    }
  }

}

# Note: nesting order: class within semester within student. 
#       only current semester displayed (so previous semester data could be transferred to history file about I don't think that's most efficient)

// Class document object

{ # outer shell

  {
  "class_id: "XXXXXX",      # alphanumeric, fixed # of chars
  "name": "XXXXXXXXXXXX",   # alphanumeric, up to 30 chars
  "description": "XXXX...", # alphanumeric, unlimited text
  "other_relevant_data": "XXXX", # alphanumeric
  }

}


Advanced
--------

1.
# eCommerce Business

// Products document object

{ # Outer shell
  {
  "product_id": "999999",   # numeric, fixed # of digits {
    [{
    "unit_price": 99.99,            # numeric, 2 decimal places
    "price_change_date": mm-dd-yyyy # date 
    "average_monthly_revenue": 999999.99 # numeric, 2 decimal places 
    },
    {
    ...                             # more historical revenue data
    }]
  }
  "description": "XXXX...", # alphanumeric
  "department": "XXXXXX...",# alphanumeric, from defined list
  "current_unit_price": "XXXX...", # alphanumeric
  "quantity_in_stock": 9999,# numeric
  },
  {
   ....
  },
  {
   ....
  }
}

# Note. Assignment unclear as to keeping track of historical revenue.
# What kind of revenue? Total revenue month by month? Average monthy 
# revenue per unit_price? I took the latter. 

// Sales document object

{ # Outer shell
  {
  "product_id": "999999",   # numeric, fixed # of digits
  "customer_name": "XXX...",# alphanumeric (could be id); 
                            # link to customer master file
  "date": "mm-dd-yyyy",     # date 
  "unit_price": 99.99,  # numeric, 2 decimal places
  "quantity_sold": 9999,    # numeric
  "total_price": 9999.99      # numeric, 2 decimal places
  },
  {
   ....
  },
  {
   ....
  }
}

2.
# Social Media Site

// Nested Index List of Friends

# Q: are username and email really necessary? (Note duplication)


{
  "user_id": 99999,                     # numeric, sequential
  "username": "foobar1",                # text
  "email": "foobar@example.com",        # text (format text@text.com)
  "friendIds": [9, 49, 999, ...]        # array of user_id
},
  // more id ... friends data

# ..............................

// Users document object

{
  "user_id": 1,
  "username": "foobar1",
  "email": "foobar@example.com",
  "telephone": 222-222-2222,
  "birthday": mm-dd,
  "photographs": {
    {"title": "XXXXXX",
     "image_name": image-file},
     // more title & image_name fields 
  },
  "activities" {
    "date": mm-dd-yyy { 
      {
      "type": "XXXXX...", # text; from menu eg "photo", "profile 
                          # change", "new friend", "comment", 
                          # "liked", etc.
      "description": "XXXXXX ...."  # text eg photo title,
                                    # profile field, new 
                                    # friend's name, etc.
                                    # (to be thought through further)
      },
      // more type/description fields    
    },
    // more date fields
  }
},
// more id, etc, documents

