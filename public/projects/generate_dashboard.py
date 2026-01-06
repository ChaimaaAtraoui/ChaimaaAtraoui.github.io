#!/usr/bin/env python3
"""
Market Share Dashboard Generator
Generates visualizations and data exports for Power BI dashboard
"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import os

# Set style
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (14, 8)

# Load data
df = pd.read_csv('market_share_data.csv')
df['Date'] = pd.to_datetime(df['Date'])

# Create output directory
os.makedirs('dashboard_outputs', exist_ok=True)

print("=" * 60)
print("MARKET SHARE DASHBOARD GENERATOR")
print("=" * 60)

# 1. Market Share Trend by Brand
print("\n[1/5] Generating Market Share Trend visualization...")
fig, ax = plt.subplots(figsize=(14, 7))

for brand in df['Brand'].unique():
    brand_data = df[df['Brand'] == brand].sort_values('Date')
    ax.plot(brand_data['Date'], brand_data['Market_Share_Percent'], 
            marker='o', linewidth=2.5, label=brand, markersize=8)

ax.set_xlabel('Date', fontsize=12, fontweight='bold')
ax.set_ylabel('Market Share (%)', fontsize=12, fontweight='bold')
ax.set_title('Market Share Trend by Brand (Jan - Jun 2023)', fontsize=14, fontweight='bold')
ax.legend(loc='best', fontsize=10)
ax.grid(True, alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('dashboard_outputs/01_market_share_trend.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 01_market_share_trend.png")
plt.close()

# 2. Market Share by Category (Latest Month)
print("[2/5] Generating Market Share by Category visualization...")
latest_date = df['Date'].max()
latest_data = df[df['Date'] == latest_date]

fig, axes = plt.subplots(1, 3, figsize=(16, 5))
categories = latest_data['Category'].unique()

for idx, category in enumerate(categories):
    cat_data = latest_data[latest_data['Category'] == category].sort_values('Market_Share_Percent', ascending=False)
    colors = sns.color_palette("husl", len(cat_data))
    
    axes[idx].barh(cat_data['Brand'], cat_data['Market_Share_Percent'], color=colors)
    axes[idx].set_xlabel('Market Share (%)', fontsize=11, fontweight='bold')
    axes[idx].set_title(f'{category} - Market Share\n(June 2023)', fontsize=12, fontweight='bold')
    axes[idx].grid(axis='x', alpha=0.3)
    
    for i, v in enumerate(cat_data['Market_Share_Percent']):
        axes[idx].text(v + 0.5, i, f'{v:.1f}%', va='center', fontsize=10)

plt.tight_layout()
plt.savefig('dashboard_outputs/02_market_share_by_category.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 02_market_share_by_category.png")
plt.close()

# 3. Sales Revenue by Region and Category
print("[3/5] Generating Sales Revenue visualization...")
fig, ax = plt.subplots(figsize=(14, 7))

revenue_by_region = df.groupby(['Region', 'Category'])['Sales_Revenue_EUR'].sum().reset_index()
pivot_revenue = revenue_by_region.pivot(index='Region', columns='Category', values='Sales_Revenue_EUR')

pivot_revenue.plot(kind='bar', ax=ax, width=0.8)
ax.set_xlabel('Region', fontsize=12, fontweight='bold')
ax.set_ylabel('Sales Revenue (EUR)', fontsize=12, fontweight='bold')
ax.set_title('Total Sales Revenue by Region and Category', fontsize=14, fontweight='bold')
ax.legend(title='Category', fontsize=10)
ax.grid(axis='y', alpha=0.3)
plt.xticks(rotation=0)
plt.tight_layout()
plt.savefig('dashboard_outputs/03_sales_revenue_by_region.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 03_sales_revenue_by_region.png")
plt.close()

# 4. Competitive Intensity Analysis
print("[4/5] Generating Competitive Intensity visualization...")
fig, ax = plt.subplots(figsize=(14, 7))

comp_data = df.groupby(['Date', 'Category'])['Competitor_Count'].first().reset_index()

for category in comp_data['Category'].unique():
    cat_comp = comp_data[comp_data['Category'] == category].sort_values('Date')
    ax.plot(cat_comp['Date'], cat_comp['Competitor_Count'], 
            marker='s', linewidth=2.5, label=category, markersize=8)

ax.set_xlabel('Date', fontsize=12, fontweight='bold')
ax.set_ylabel('Number of Competitors', fontsize=12, fontweight='bold')
ax.set_title('Competitive Intensity by Category', fontsize=14, fontweight='bold')
ax.legend(loc='best', fontsize=10)
ax.grid(True, alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('dashboard_outputs/04_competitive_intensity.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 04_competitive_intensity.png")
plt.close()

# 5. Market Growth Rate Analysis
print("[5/5] Generating Market Growth Rate visualization...")
fig, ax = plt.subplots(figsize=(14, 7))

growth_data = df.groupby(['Date', 'Category'])['Market_Growth_Rate'].first().reset_index()

for category in growth_data['Category'].unique():
    cat_growth = growth_data[growth_data['Category'] == category].sort_values('Date')
    ax.plot(cat_growth['Date'], cat_growth['Market_Growth_Rate'], 
            marker='D', linewidth=2.5, label=category, markersize=8)

ax.set_xlabel('Date', fontsize=12, fontweight='bold')
ax.set_ylabel('Market Growth Rate (%)', fontsize=12, fontweight='bold')
ax.set_title('Market Growth Rate Trends by Category', fontsize=14, fontweight='bold')
ax.legend(loc='best', fontsize=10)
ax.grid(True, alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('dashboard_outputs/05_market_growth_rate.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 05_market_growth_rate.png")
plt.close()

# Generate Summary Statistics
print("\n" + "=" * 60)
print("SUMMARY STATISTICS")
print("=" * 60)

summary_stats = {
    'Total Records': len(df),
    'Date Range': f"{df['Date'].min().date()} to {df['Date'].max().date()}",
    'Brands': ', '.join(df['Brand'].unique()),
    'Categories': ', '.join(df['Category'].unique()),
    'Regions': ', '.join(df['Region'].unique()),
    'Total Sales Revenue': f"€{df['Sales_Revenue_EUR'].sum():,.0f}",
    'Total Sales Volume': f"{df['Sales_Volume_Units'].sum():,.0f} units",
    'Average Market Share': f"{df['Market_Share_Percent'].mean():.2f}%",
    'Highest Market Share': f"{df['Market_Share_Percent'].max():.2f}%",
    'Lowest Market Share': f"{df['Market_Share_Percent'].min():.2f}%",
}

for key, value in summary_stats.items():
    print(f"{key:.<40} {value}")

# Export processed data for Power BI
print("\n" + "=" * 60)
print("EXPORTING DATA FOR POWER BI")
print("=" * 60)

# Export 1: Brand Performance Summary
brand_summary = df.groupby('Brand').agg({
    'Market_Share_Percent': 'mean',
    'Sales_Revenue_EUR': 'sum',
    'Sales_Volume_Units': 'sum',
    'Price_Per_Unit_EUR': 'mean'
}).round(2)
brand_summary.to_csv('dashboard_outputs/brand_performance_summary.csv')
print("✓ Exported: brand_performance_summary.csv")

# Export 2: Category Performance Summary
category_summary = df.groupby('Category').agg({
    'Market_Share_Percent': 'mean',
    'Sales_Revenue_EUR': 'sum',
    'Sales_Volume_Units': 'sum',
    'Market_Growth_Rate': 'mean'
}).round(2)
category_summary.to_csv('dashboard_outputs/category_performance_summary.csv')
print("✓ Exported: category_performance_summary.csv")

# Export 3: Regional Performance Summary
region_summary = df.groupby('Region').agg({
    'Market_Share_Percent': 'mean',
    'Sales_Revenue_EUR': 'sum',
    'Sales_Volume_Units': 'sum',
    'Competitor_Count': 'mean'
}).round(2)
region_summary.to_csv('dashboard_outputs/regional_performance_summary.csv')
print("✓ Exported: regional_performance_summary.csv")

# Export 4: Time Series Data
df_sorted = df.sort_values('Date')
df_sorted.to_csv('dashboard_outputs/market_share_timeseries.csv', index=False)
print("✓ Exported: market_share_timeseries.csv")

print("\n" + "=" * 60)
print("✓ DASHBOARD GENERATION COMPLETE")
print("=" * 60)
print("\nAll files saved to: dashboard_outputs/")
print("\nNext Steps:")
print("1. Open Power BI Desktop")
print("2. Import CSV files from dashboard_outputs/")
print("3. Create relationships between tables")
print("4. Build visualizations using the generated charts as reference")
print("5. Publish to Power BI Service")
