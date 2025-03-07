import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const SubscriptionPage = () => {
  const plans = [
    {
      title: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Basic access to get you started',
      features: [
        'Limited activity library (25+ activities)',
        'Basic search functionality',
        'Single child profile',
        'Activity bookmarking'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outlined',
      highlighted: false
    },
    {
      title: 'Premium',
      price: '$7.99',
      period: 'per month',
      description: "Everything you need for your child's development",
      features: [
        'Full activity library (500+ activities)',
        'Advanced search and filters',
        'Personalized recommendations',
        'Progress tracking tools',
        'Printable materials',
        'Ad-free experience'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'contained',
      highlighted: true
    },
    {
      title: 'Family',
      price: '$12.99',
      period: 'per month',
      description: 'Perfect for families with multiple children',
      features: [
        'Everything in Premium',
        'Up to 4 child profiles',
        'Family activity recommendations',
        'Shared progress dashboard',
        'Priority customer support'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'outlined',
      highlighted: false
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8} className="fade-in">
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            Choose Your Perfect Plan
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Unlock a world of educational activities tailored to your child's developmental needs
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card 
                className={`subscription-card fade-in ${plan.highlighted ? 'pulse' : ''}`}
                sx={{ 
                  height: '100%',
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'visible',
                  boxShadow: plan.highlighted ? '0 8px 40px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.1)',
                  border: plan.highlighted ? '2px solid #4A90E2' : 'none',
                }}
              >
                {plan.highlighted && (
                  <Paper
                    sx={{
                      position: 'absolute',
                      top: -15,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: '#4A90E2',
                      color: 'white',
                      py: 0.75,
                      px: 2,
                      borderRadius: 5,
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      zIndex: 1,
                    }}
                    className="pulse"
                  >
                    <StarIcon fontSize="small" />
                    Most Popular
                  </Paper>
                )}
                <CardHeader
                  title={plan.title}
                  titleTypographyProps={{ align: 'center', variant: 'h5', fontWeight: 700 }}
                  sx={{ 
                    bgcolor: plan.highlighted ? '#4A90E2' : 'transparent',
                    color: plan.highlighted ? 'white' : 'inherit',
                    borderRadius: plan.highlighted ? '16px 16px 0 0' : 0
                  }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography component="h2" variant="h3" color="text.primary">
                      {plan.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {plan.period}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" align="center" sx={{ fontStyle: 'italic', mb: 2 }}>
                    {plan.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List sx={{ mb: 2 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon sx={{ color: plan.highlighted ? '#4A90E2' : '#4CAF50' }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button 
                      fullWidth 
                      variant={plan.buttonVariant}
                      color={plan.highlighted ? 'primary' : 'primary'}
                      size="large"
                      className={plan.highlighted ? 'pulse' : 'hover-lift'}
                      sx={{ 
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: plan.highlighted ? '#FF6B6B' : '',
                        '&:hover': {
                          bgcolor: plan.highlighted ? '#FF5252' : ''
                        }
                      }}
                    >
                      {plan.buttonText}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, p: 4, bgcolor: '#f5f9ff', borderRadius: 4 }} className="fade-in">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
                Not sure which plan is right for you?
              </Typography>
              <Typography variant="body1" paragraph>
                Try our 14-day free trial of any premium plan. No credit card required, and you can cancel anytime.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Full access to all premium features" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="No commitment, cancel anytime" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Friendly support to help you get started" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  bgcolor: '#4A90E2',
                  '&:hover': {
                    bgcolor: '#3570B2'
                  }
                }}
                className="pulse"
              >
                Start Your Free Trial
              </Button>
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                No credit card required
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 10, textAlign: 'center' }} className="fade-in">
          <Typography variant="h4" component="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              {
                question: 'Can I change plans later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.'
              },
              {
                question: 'How do I cancel my subscription?',
                answer: "You can cancel your subscription anytime from your account settings. You'll continue to have access until the end of your billing period."
              },
              {
                question: 'Is there a limit to how many activities I can access?',
                answer: 'Free users can access up to 25 activities. Premium and Family plan subscribers have unlimited access to our entire library of 500+ activities.'
              },
              {
                question: 'Do you offer refunds?',
                answer: "If you're not satisfied with your subscription, contact us within 7 days of purchase for a full refund."
              }
            ].map((faq, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }} className="hover-lift">
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {faq.question}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SubscriptionPage;