'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
// mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import { InputAdornment, Stack, Button } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
// icons
import { FiSearch } from 'react-icons/fi';

// components
import NoDataFound from '@/illustrations/dataNotFound';
import { useMutation } from 'react-query';
import BlurImageAvatar from '@/components/avatar';
// api
import * as api from '@/services';
// hooks
import { useCurrencyConvert } from '@/hooks/convertCurrency';
import { useCurrencyFormatter } from '@/hooks/formatCurrency';

Search.propTypes = {
  onClose: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
};

interface FilterProps {
  id: string;
}

export default function Search({ ...props }) {
  const { onClose, mobile, multiSelect, selectedProducts, handleSave } = props;
  const [state, setstate] = React.useState({
    products: [],
    selected: selectedProducts || [],
    initialized: false,
    category: '',
  });
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  const router = useRouter();
  const [search, setSearch] = React.useState('');

  // const { data: filters } = useQuery(['get-search-filters'], () =>
  //   api.getSearchFilters()
  // );
  const { mutate, isLoading } = useMutation('search', api.search, {
    onSuccess: (data) => {
      // setstate({ ...state, ...data });
      setstate({ ...state, products: data?.data });
    },
  });

  const [focus, setFocus] = React.useState(true);

  const handleListItemClick = (prop: FilterProps) => {
    if (multiSelect) {
      const matched = state.selected.filter(
        (v: FilterProps) => prop.id === v.id
      );
      const notMatched = state.selected.filter(
        (v: FilterProps) => prop.id !== v.id
      );
      if (Boolean(matched.length)) {
        setstate({ ...state, selected: notMatched });
      } else {
        setstate({ ...state, selected: [...state.selected, prop] });
      }
    } else {
      if (!mobile) {
        onClose(prop);
      }
      router.push(`/product/${prop}`);
    }
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      setFocus(false);
    }
  };
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      mutate(search);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <TextField
        id='standard-basic'
        variant='standard'
        placeholder='Rechercher des produits'
        onFocus={() => setFocus(true)}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          setSearch(e.target.value);
          setstate({ ...state, initialized: true });
        }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{ justifyContent: 'center' }}>
              {isLoading ? (
                <CircularProgress
                  sx={{ width: '24px !important', height: '24px !important' }}
                />
              ) : (
                <FiSearch size={20} />
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          ...(mobile && {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            bgcolor: 'background.paper',
          }),
          '& .MuiInput-root': {
            height: { lg: 72, md: 72, sm: 72, xs: 56 },
          },
          '& .MuiInputAdornment-root': {
            width: 100,
            mr: 0,
            svg: {
              mx: 'auto',
              color: 'primary.main',
            },
          },
        }}
      />
      <Divider />
      <Box className='scroll-main'>
        <Box sx={{ height: mobile ? 'auto' : '342px', overflow: 'auto' }}>
          {state.initialized &&
            !isLoading &&
            !Boolean(state.products.length) && (
              <>
                <Stack
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    svg: {
                      width: 300,
                      height: 380,
                    },
                  }}>
                  <NoDataFound className='svg' />
                </Stack>
              </>
            )}

          {!isLoading && !Boolean(state.products.length) ? (
            ''
          ) : (
            <>
              <MenuList
                sx={{
                  pt: 0,
                  mt: 1,
                  overflow: 'auto',
                  px: 1,
                  li: {
                    borderRadius: '8px',
                    border: `1px solid transparent`,
                    '&:hover, &.Mui-focusVisible, &.Mui-selected ': {
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.16),
                      h6: {
                        color: 'primary.main',
                      },
                    },
                    '&.active': {
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.16),
                      h6: {
                        color: 'primary.main',
                      },
                    },
                  },
                }}
                autoFocusItem={!focus}>
                {(isLoading
                  ? Array.from(new Array(mobile ? 6 : 8))
                  : state.products
                ).map((product) => (
                  <MenuItem
                    key={Math.random()}
                    className={
                      Boolean(
                        state.selected.filter(
                          (v: FilterProps) => v.id === product?.id
                        )?.length
                      )
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      handleListItemClick(multiSelect ? product : product?.slug)
                    }>
                    <ListItemIcon>
                      {isLoading ? (
                        <Skeleton
                          variant='circular'
                          width={40}
                          height={40}
                        />
                      ) : (
                        <BlurImageAvatar
                          alt={product.name}
                          src={product.images[0].url}
                          priority
                          layout='fill'
                          objectFit='cover'
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText>
                      <Stack
                        direction='row'
                        gap={1}
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <div>
                          <Typography
                            variant='subtitle1'
                            color='text.primary'
                            noWrap>
                            {isLoading ? (
                              <Skeleton
                                variant='text'
                                width='200px'
                              />
                            ) : (
                              product.name
                            )}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            noWrap>
                            {isLoading ? (
                              <Skeleton
                                variant='text'
                                width='200px'
                              />
                            ) : (
                              product?.category?.name
                            )}
                          </Typography>
                        </div>
                        <Typography
                          variant='subtitle2'
                          color='text.primary'
                          noWrap>
                          {isLoading ? (
                            <Skeleton
                              variant='text'
                              width='100px'
                            />
                          ) : (
                            fCurrency(cCurrency(product.priceSale))
                          )}
                        </Typography>
                      </Stack>
                    </ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Box>{' '}
        {multiSelect && (
          <Stack
            gap={1}
            direction={'row'}
            p={1}
            justifyContent={'end'}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => handleSave(selectedProducts)}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleSave(state.selected)}>
              Save
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
}
