import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

const developmentalAreas = [
  { value: 'cognitive', label: 'Cognitive' },
  { value: 'motor', label: 'Motor Skills' },
  { value: 'social', label: 'Social' },
  { value: 'language', label: 'Language' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'creativity', label: 'Creativity' }
];

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

const ActivityFilter = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    ageRange: [initialFilters.ageMin || 0, initialFilters.ageMax || 6],
    developmentalAreas: initialFilters.developmentalAreas ? initialFilters.developmentalAreas.split(',') : [],
    timeMax: initialFilters.timeMax || 60,
    difficulty: initialFilters.difficulty || '',
    materials: initialFilters.materials || '',
    search: initialFilters.search || ''
  });
  
  const [expanded, setExpanded] = useState(false);
  
  const handleAgeChange = (event, newValue) => {
    setFilters({ ...filters, ageRange: newValue });
  };
  
  const handleTimeChange = (event, newValue) => {
    setFilters({ ...filters, timeMax: newValue });
  };
  
  const handleDevelopmentalAreaChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFilters({
        ...filters,
        developmentalAreas: [...filters.developmentalAreas, value]
      });
    } else {
      setFilters({
        ...filters,
        developmentalAreas: filters.developmentalAreas.filter(area => area !== value)
      });
    }
  };
  
  const handleDifficultyChange = (event) => {
    const { value, checked } = event.target;
    setFilters({
      ...filters,
      difficulty: checked ? value : ''
    });
  };
  
  const handleSearchChange = (event) => {
    setFilters({ ...filters, search: event.target.value });
  };
  
  const handleMaterialsChange = (event) => {
    setFilters({ ...filters, materials: event.target.value });
  };
  
  const handleApplyFilters = () => {
    const appliedFilters = {
      ageMin: filters.ageRange[0],
      ageMax: filters.ageRange[1],
      developmentalAreas: filters.developmentalAreas.join(','),
      timeMax: filters.timeMax,
      difficulty: filters.difficulty,
      materials: filters.materials,
      search: filters.search
    };
    
    // Remove empty filters
    Object.keys(appliedFilters).forEach(key => {
      if (appliedFilters[key] === '' || appliedFilters[key] === null || appliedFilters[key] === undefined) {
        delete appliedFilters[key];
      }
    });
    
    onFilterChange(appliedFilters);
  };
  
  const handleResetFilters = () => {
    setFilters({
      ageRange: [0, 6],
      developmentalAreas: [],
      timeMax: 60,
      difficulty: '',
      materials: '',
      search: ''
    });
    
    onFilterChange({});
  };
  
  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'developmentalAreas') {
      setFilters({
        ...filters,
        developmentalAreas: filters.developmentalAreas.filter(area => area !== value)
      });
    } else if (filterType === 'difficulty') {
      setFilters({ ...filters, difficulty: '' });
    } else if (filterType === 'search') {
      setFilters({ ...filters, search: '' });
    } else if (filterType === 'materials') {
      setFilters({ ...filters, materials: '' });
    }
  };
  
  // Count active filters
  const activeFilterCount = [
    filters.ageRange[0] > 0 || filters.ageRange[1] < 6 ? 1 : 0,
    filters.developmentalAreas.length,
    filters.timeMax < 60 ? 1 : 0,
    filters.difficulty ? 1 : 0,
    filters.materials ? 1 : 0,
    filters.search ? 1 : 0
  ].reduce((a, b) => a + b, 0);
  
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search activities"
          variant="outlined"
          value={filters.search}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />
        
        {activeFilterCount > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {filters.search && (
              <Chip 
                label={`Search: ${filters.search}`} 
                onDelete={() => handleRemoveFilter('search')}
              />
            )}
            
            {(filters.ageRange[0] > 0 || filters.ageRange[1] < 6) && (
              <Chip 
                label={`Age: ${filters.ageRange[0]}-${filters.ageRange[1]} years`} 
              />
            )}
            
            {filters.developmentalAreas.map(area => (
              <Chip 
                key={area}
                label={`Area: ${area}`}
                onDelete={() => handleRemoveFilter('developmentalAreas', area)}
              />
            ))}
            
            {filters.timeMax < 60 && (
              <Chip 
                label={`Time: ≤ ${filters.timeMax} min`} 
              />
            )}
            
            {filters.difficulty && (
              <Chip 
                label={`Difficulty: ${filters.difficulty}`}
                onDelete={() => handleRemoveFilter('difficulty')}
              />
            )}
            
            {filters.materials && (
              <Chip 
                label={`Materials: ${filters.materials}`}
                onDelete={() => handleRemoveFilter('materials')}
              />
            )}
          </Box>
        )}
      </Box>
      
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterListIcon sx={{ mr: 1 }} />
            <Typography>Advanced Filters</Typography>
            {activeFilterCount > 0 && (
              <Chip 
                size="small" 
                label={activeFilterCount} 
                color="primary" 
                sx={{ ml: 1 }} 
              />
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Age Range (years)</Typography>
            <Slider
              value={filters.ageRange}
              onChange={handleAgeChange}
              valueLabelDisplay="auto"
              min={0}
              max={6}
              step={0.5}
              marks={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' }
              ]}
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Maximum Time (minutes)</Typography>
            <Slider
              value={filters.timeMax}
              onChange={handleTimeChange}
              valueLabelDisplay="auto"
              min={5}
              max={60}
              step={5}
              marks={[
                { value: 5, label: '5' },
                { value: 15, label: '15' },
                { value: 30, label: '30' },
                { value: 45, label: '45' },
                { value: 60, label: '60' }
              ]}
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Developmental Areas</Typography>
            <FormGroup row>
              {developmentalAreas.map((area) => (
                <FormControlLabel
                  key={area.value}
                  control={
                    <Checkbox
                      checked={filters.developmentalAreas.includes(area.value)}
                      onChange={handleDevelopmentalAreaChange}
                      value={area.value}
                    />
                  }
                  label={area.label}
                />
              ))}
            </FormGroup>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Difficulty Level</Typography>
            <FormGroup row>
              {difficultyLevels.map((level) => (
                <FormControlLabel
                  key={level.value}
                  control={
                    <Checkbox
                      checked={filters.difficulty === level.value}
                      onChange={handleDifficultyChange}
                      value={level.value}
                    />
                  }
                  label={level.label}
                />
              ))}
            </FormGroup>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Materials (comma separated)</Typography>
            <TextField
              fullWidth
              placeholder="e.g. paper, scissors, glue"
              value={filters.materials}
              onChange={handleMaterialsChange}
              helperText="Find activities that use these materials"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
            <Button 
              variant="contained" 
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ActivityFilter;