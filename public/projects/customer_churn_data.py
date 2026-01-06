#!/usr/bin/env python3
"""
Generate synthetic customer churn dataset
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta

np.random.seed(42)

# Generate customer data
n_customers = 5000

data = {
    'CustomerID': range(1, n_customers + 1),
    'Tenure_Months': np.random.randint(1, 72, n_customers),
    'Monthly_Charges': np.random.uniform(20, 150, n_customers),
    'Total_Charges': np.random.uniform(100, 8000, n_customers),
    'Contract_Type': np.random.choice(['Month-to-month', 'One year', 'Two year'], n_customers, p=[0.4, 0.3, 0.3]),
    'Internet_Service': np.random.choice(['Fiber optic', 'DSL', 'No'], n_customers, p=[0.4, 0.35, 0.25]),
    'Online_Security': np.random.choice(['Yes', 'No'], n_customers, p=[0.3, 0.7]),
    'Tech_Support': np.random.choice(['Yes', 'No'], n_customers, p=[0.25, 0.75]),
    'Paperless_Billing': np.random.choice(['Yes', 'No'], n_customers, p=[0.6, 0.4]),
    'Payment_Method': np.random.choice(['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'], n_customers),
    'Customer_Service_Calls': np.random.randint(0, 10, n_customers),
    'Monthly_Increase_Rate': np.random.uniform(-5, 15, n_customers),
}

df = pd.DataFrame(data)

# Create churn target variable based on features
# Higher churn probability for:
# - Month-to-month contracts
# - Fiber optic (higher prices)
# - No online security
# - High monthly charges
# - Many customer service calls
# - Short tenure

churn_probability = (
    (df['Contract_Type'] == 'Month-to-month') * 0.3 +
    (df['Contract_Type'] == 'One year') * 0.1 +
    (df['Internet_Service'] == 'Fiber optic') * 0.1 +
    (df['Online_Security'] == 'No') * 0.15 +
    (df['Monthly_Charges'] > 100) * 0.15 +
    (df['Customer_Service_Calls'] > 5) * 0.2 +
    (df['Tenure_Months'] < 12) * 0.25 +
    (df['Payment_Method'] == 'Electronic check') * 0.1
)

# Add some randomness
churn_probability = np.clip(churn_probability + np.random.normal(0, 0.05, n_customers), 0, 1)
df['Churn'] = (np.random.random(n_customers) < churn_probability).astype(int)

# Save dataset
df.to_csv('customer_churn_dataset.csv', index=False)
print(f"✓ Generated customer churn dataset with {len(df)} records")
print(f"✓ Churn rate: {df['Churn'].mean()*100:.1f}%")
print(f"✓ Saved to: customer_churn_dataset.csv")
