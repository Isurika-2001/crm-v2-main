import PropTypes from 'prop-types';

// material-ui
import { Button, CardActions, CardContent, Grid, Typography, ListItem, ListItemText } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
// import config from '../../../config';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import EarningIcon from 'assets/images/icons/courses.svg';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading, products }) => {
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Ongoing Courses</Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <img src={EarningIcon} alt="Notification" />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column">
                  {products.map((product, index) => {
                    const hasDivider = index < products.length - 1;
                    // const ago = formatDistanceToNow(product.updatedAt);

                    return (
                      <ListItem divider={hasDivider} key={product.id}>
                        <ListItemText
                          primary={product.name}
                          primaryTypographyProps={{ variant: 'subtitle1' }}
                          secondary={product.description}
                          secondaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
  products: PropTypes.array
};

export default PopularCard;
