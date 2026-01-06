# Projects Assets Directory

This directory contains all images and visualizations for the portfolio projects.

## Required Files

### Hero Images (Root Level)
Place these images directly in `/public/projects/`:
- `hero_market_dashboard.png`
- `hero_churn_prediction.png`
- `hero_viral_marketing.png`
- `diagram_analysis_workflow.png`

### Market Dashboard Project
Place in `/public/projects/dashboard_outputs/`:
- Dashboard visualizations
- Market analysis charts
- Regional performance graphs

### Churn Prediction Project
Place in `/public/projects/model_outputs/`:
- Model performance charts
- Feature importance visualizations
- ROC curves and confusion matrices

### Viral Marketing Project
Place in `/public/projects/viral_analysis_outputs/`:
- Campaign analysis charts
- Platform comparison visualizations
- ROI analysis graphs

## File Naming Convention
- Use lowercase with underscores: `market_share_by_region.png`
- Keep original filenames from the project files
- Supported formats: PNG, JPG, JPEG, SVG

## After Adding Images
1. Verify all images are in correct directories
2. Test locally: `npm run dev`
3. Check browser console for any 404 errors
4. Rebuild: `npm run build`
