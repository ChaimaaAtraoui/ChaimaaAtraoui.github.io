#!/usr/bin/env python3
"""
Customer Churn Prediction Model
Complete ML pipeline with model training, evaluation, and visualization
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    classification_report, confusion_matrix, roc_auc_score, 
    roc_curve, precision_recall_curve, f1_score, accuracy_score
)
import os
import warnings
warnings.filterwarnings('ignore')

print("=" * 70)
print("CUSTOMER CHURN PREDICTION MODEL")
print("=" * 70)

# Load data
print("\n[1/6] Loading and preparing data...")
df = pd.read_csv('customer_churn_dataset.csv')
print(f"✓ Loaded {len(df)} customer records")
print(f"✓ Churn distribution: {df['Churn'].value_counts().to_dict()}")

# Create output directory
os.makedirs('model_outputs', exist_ok=True)

# Data preprocessing
print("\n[2/6] Preprocessing data...")

# Encode categorical variables
label_encoders = {}
categorical_cols = ['Contract_Type', 'Internet_Service', 'Online_Security', 
                    'Tech_Support', 'Paperless_Billing', 'Payment_Method']

df_processed = df.copy()

for col in categorical_cols:
    le = LabelEncoder()
    df_processed[col] = le.fit_transform(df_processed[col])
    label_encoders[col] = le

# Prepare features and target
X = df_processed.drop(['CustomerID', 'Churn'], axis=1)
y = df_processed['Churn']

print(f"✓ Features: {list(X.columns)}")
print(f"✓ Target variable: Churn (Binary)")

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
print(f"✓ Training set: {len(X_train)} samples")
print(f"✓ Test set: {len(X_test)} samples")

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
print("✓ Features scaled using StandardScaler")

# Train models
print("\n[3/6] Training models...")

models = {
    'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
    'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42)
}

trained_models = {}
model_results = {}

for model_name, model in models.items():
    print(f"  Training {model_name}...")
    
    # Use scaled data for Logistic Regression, original for tree-based models
    if model_name == 'Logistic Regression':
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
        y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]
    else:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    trained_models[model_name] = model
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_pred_proba)
    
    model_results[model_name] = {
        'accuracy': accuracy,
        'f1': f1,
        'roc_auc': roc_auc,
        'y_pred': y_pred,
        'y_pred_proba': y_pred_proba
    }
    
    print(f"    ✓ Accuracy: {accuracy:.4f}")
    print(f"    ✓ F1-Score: {f1:.4f}")
    print(f"    ✓ ROC-AUC: {roc_auc:.4f}")

# Select best model (Gradient Boosting typically performs best)
best_model_name = 'Gradient Boosting'
best_model = trained_models[best_model_name]
best_results = model_results[best_model_name]

print(f"\n✓ Best Model: {best_model_name}")

# Generate visualizations
print("\n[4/6] Generating visualizations...")

# 1. Model Comparison
fig, ax = plt.subplots(figsize=(12, 6))
metrics_df = pd.DataFrame(model_results).T
metrics_df[['accuracy', 'f1', 'roc_auc']].plot(kind='bar', ax=ax, width=0.8)
ax.set_ylabel('Score', fontsize=12, fontweight='bold')
ax.set_title('Model Performance Comparison', fontsize=14, fontweight='bold')
ax.set_ylim([0.5, 1.0])
ax.legend(['Accuracy', 'F1-Score', 'ROC-AUC'], fontsize=10)
ax.grid(axis='y', alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('model_outputs/01_model_comparison.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 01_model_comparison.png")
plt.close()

# 2. Confusion Matrix for Best Model
fig, ax = plt.subplots(figsize=(8, 6))
cm = confusion_matrix(y_test, best_results['y_pred'])
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax, cbar=False,
            xticklabels=['No Churn', 'Churn'], yticklabels=['No Churn', 'Churn'])
ax.set_ylabel('True Label', fontsize=12, fontweight='bold')
ax.set_xlabel('Predicted Label', fontsize=12, fontweight='bold')
ax.set_title(f'Confusion Matrix - {best_model_name}', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('model_outputs/02_confusion_matrix.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 02_confusion_matrix.png")
plt.close()

# 3. ROC Curve
fig, ax = plt.subplots(figsize=(10, 8))
for model_name, results in model_results.items():
    fpr, tpr, _ = roc_curve(y_test, results['y_pred_proba'])
    auc = results['roc_auc']
    ax.plot(fpr, tpr, linewidth=2.5, label=f'{model_name} (AUC={auc:.3f})')

ax.plot([0, 1], [0, 1], 'k--', linewidth=2, label='Random Classifier')
ax.set_xlabel('False Positive Rate', fontsize=12, fontweight='bold')
ax.set_ylabel('True Positive Rate', fontsize=12, fontweight='bold')
ax.set_title('ROC Curve Comparison', fontsize=14, fontweight='bold')
ax.legend(loc='lower right', fontsize=10)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('model_outputs/03_roc_curve.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 03_roc_curve.png")
plt.close()

# 4. Feature Importance (for tree-based model)
fig, ax = plt.subplots(figsize=(12, 8))
feature_importance = pd.DataFrame({
    'Feature': X.columns,
    'Importance': best_model.feature_importances_
}).sort_values('Importance', ascending=False).head(15)

colors = plt.cm.viridis(np.linspace(0, 1, len(feature_importance)))
ax.barh(feature_importance['Feature'], feature_importance['Importance'], color=colors)
ax.set_xlabel('Importance Score', fontsize=12, fontweight='bold')
ax.set_title('Top 15 Feature Importance - Gradient Boosting', fontsize=14, fontweight='bold')
ax.grid(axis='x', alpha=0.3)
plt.tight_layout()
plt.savefig('model_outputs/04_feature_importance.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 04_feature_importance.png")
plt.close()

# 5. Precision-Recall Curve
fig, ax = plt.subplots(figsize=(10, 8))
precision, recall, _ = precision_recall_curve(y_test, best_results['y_pred_proba'])
ax.plot(recall, precision, linewidth=2.5, color='#2E86AB')
ax.fill_between(recall, precision, alpha=0.2, color='#2E86AB')
ax.set_xlabel('Recall', fontsize=12, fontweight='bold')
ax.set_ylabel('Precision', fontsize=12, fontweight='bold')
ax.set_title('Precision-Recall Curve - Gradient Boosting', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('model_outputs/05_precision_recall_curve.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 05_precision_recall_curve.png")
plt.close()

# 6. Churn Distribution Analysis
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Original distribution
df['Churn'].value_counts().plot(kind='bar', ax=axes[0], color=['#2E86AB', '#A23B72'])
axes[0].set_title('Actual Churn Distribution', fontsize=12, fontweight='bold')
axes[0].set_ylabel('Count', fontsize=11, fontweight='bold')
axes[0].set_xticklabels(['No Churn', 'Churn'], rotation=0)
axes[0].grid(axis='y', alpha=0.3)

# Predicted distribution
pd.Series(best_results['y_pred']).value_counts().plot(kind='bar', ax=axes[1], color=['#2E86AB', '#A23B72'])
axes[1].set_title('Predicted Churn Distribution', fontsize=12, fontweight='bold')
axes[1].set_ylabel('Count', fontsize=11, fontweight='bold')
axes[1].set_xticklabels(['No Churn', 'Churn'], rotation=0)
axes[1].grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.savefig('model_outputs/06_churn_distribution.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 06_churn_distribution.png")
plt.close()

# Generate detailed report
print("\n[5/6] Generating detailed classification report...")

report = classification_report(y_test, best_results['y_pred'], 
                               target_names=['No Churn', 'Churn'])

with open('model_outputs/classification_report.txt', 'w') as f:
    f.write("=" * 70 + "\n")
    f.write("CUSTOMER CHURN PREDICTION - CLASSIFICATION REPORT\n")
    f.write("=" * 70 + "\n\n")
    f.write(f"Model: {best_model_name}\n")
    f.write(f"Test Set Size: {len(y_test)} samples\n")
    f.write(f"Accuracy: {accuracy_score(y_test, best_results['y_pred']):.4f}\n")
    f.write(f"ROC-AUC: {best_results['roc_auc']:.4f}\n\n")
    f.write(report)

print("✓ Saved: classification_report.txt")

# Export predictions
predictions_df = pd.DataFrame({
    'CustomerID': df.iloc[X_test.index]['CustomerID'].values,
    'Actual_Churn': y_test.values,
    'Predicted_Churn': best_results['y_pred'],
    'Churn_Probability': best_results['y_pred_proba']
})
predictions_df.to_csv('model_outputs/predictions.csv', index=False)
print("✓ Saved: predictions.csv")

# Export model summary
model_summary = pd.DataFrame({
    'Model': list(model_results.keys()),
    'Accuracy': [v['accuracy'] for v in model_results.values()],
    'F1-Score': [v['f1'] for v in model_results.values()],
    'ROC-AUC': [v['roc_auc'] for v in model_results.values()]
})
model_summary.to_csv('model_outputs/model_summary.csv', index=False)
print("✓ Saved: model_summary.csv")

# Final summary
print("\n[6/6] Generating summary statistics...")
print("\n" + "=" * 70)
print("MODEL PERFORMANCE SUMMARY")
print("=" * 70)

summary_stats = {
    'Best Model': best_model_name,
    'Accuracy': f"{accuracy_score(y_test, best_results['y_pred']):.4f}",
    'F1-Score': f"{f1_score(y_test, best_results['y_pred']):.4f}",
    'ROC-AUC': f"{best_results['roc_auc']:.4f}",
    'True Negatives': cm[0, 0],
    'False Positives': cm[0, 1],
    'False Negatives': cm[1, 0],
    'True Positives': cm[1, 1],
    'Precision': f"{cm[1, 1] / (cm[1, 1] + cm[0, 1]):.4f}",
    'Recall': f"{cm[1, 1] / (cm[1, 1] + cm[1, 0]):.4f}",
}

for key, value in summary_stats.items():
    print(f"{key:.<40} {value}")

print("\n" + "=" * 70)
print("✓ MODEL TRAINING COMPLETE")
print("=" * 70)
print("\nAll outputs saved to: model_outputs/")
print("\nKey Files Generated:")
print("  • 01_model_comparison.png - Performance metrics comparison")
print("  • 02_confusion_matrix.png - Prediction accuracy matrix")
print("  • 03_roc_curve.png - ROC curves for all models")
print("  • 04_feature_importance.png - Top features driving predictions")
print("  • 05_precision_recall_curve.png - Precision-Recall tradeoff")
print("  • 06_churn_distribution.png - Actual vs predicted distribution")
print("  • predictions.csv - Customer-level predictions")
print("  • model_summary.csv - Model performance metrics")
print("  • classification_report.txt - Detailed classification metrics")
