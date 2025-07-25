/**
 * ProductQuickView Modal Component
 * Professional modal for product quick view with enlarged image
 * Following Material Design and industry UX standards
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Skeleton,
  Fade,
  useMediaQuery,
  Divider,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as InStockIcon,
  Cancel as OutOfStockIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from '@mui/icons-material';
import { Product } from '../../types/product.types';
import OptimizedImage from '../common/OptimizedImage';

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  open,
  onClose
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageZoomed, setImageZoomed] = useState(false);

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (open) {
      setImageZoomed(false);
    }
  }, [open, product]);

  if (!product) return null;

  const toggleImageZoom = () => {
    setImageZoomed(!imageZoomed);
  };

  const getAvailabilityColor = (availability: Product['availability']) => {
    switch (availability) {
      case 'in-stock':
        return theme.palette.success.main;
      case 'out-of-stock':
        return theme.palette.error.main;
      case 'limited':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getAvailabilityIcon = (availability: Product['availability']) => {
    switch (availability) {
      case 'in-stock':
        return <InStockIcon fontSize="small" />;
      case 'out-of-stock':
        return <OutOfStockIcon fontSize="small" />;
      default:
        return <InStockIcon fontSize="small" />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          maxHeight: isMobile ? '100vh' : '90vh',
          m: isMobile ? 0 : 2,
          width: isMobile ? '100vw' : 'auto',
          maxWidth: isMobile ? '100vw' : 'md',
        }
      }}
      TransitionComponent={Fade}
      transitionDuration={300}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: alpha(theme.palette.common.black, 0.7),
          backdropFilter: 'blur(4px)',
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
          px: isMobile ? 2 : 3,
          py: isMobile ? 1.5 : 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant={isMobile ? "h6" : "h6"} component="h2" sx={{ fontWeight: 600 }}>
          Quick View
        </Typography>
        <IconButton
          onClick={onClose}
          size={isMobile ? "medium" : "small"}
          sx={{
            color: theme.palette.grey[500],
            minWidth: isMobile ? 44 : 'auto',
            minHeight: isMobile ? 44 : 'auto',
            '&:hover': {
              backgroundColor: alpha(theme.palette.grey[500], 0.1),
            }
          }}
        >
          <CloseIcon fontSize={isMobile ? "medium" : "small"} />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            minHeight: isMobile ? 'auto' : 400,
          }}
        >
          {/* Image Section */}
          <Box
            sx={{
              flex: isMobile ? 'none' : 1,
              position: 'relative',
              backgroundColor: theme.palette.grey[50],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: isMobile ? 250 : 400,
              maxHeight: isMobile ? 300 : 'none',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={toggleImageZoom}
          >
            {/* Product Image */}
            <OptimizedImage
              src={product.image}
              alt={product.name}
              objectFit="contain"
              onClick={toggleImageZoom}
              sx={{
                maxWidth: imageZoomed ? '150%' : '90%',
                maxHeight: imageZoomed ? '150%' : '90%',
                width: 'auto',
                height: 'auto',
                transition: 'all 0.3s ease-in-out',
                transform: imageZoomed ? 'scale(1.2)' : 'scale(1)',
                cursor: 'pointer',
              }}
              showLoadingSkeleton={true}
              showErrorFallback={true}
            />

            {/* Zoom Icon */}
            <IconButton
              sx={{
                position: 'absolute',
                top: isMobile ? 4 : 8,
                right: isMobile ? 4 : 8,
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                minWidth: isMobile ? 44 : 'auto',
                minHeight: isMobile ? 44 : 'auto',
                '&:hover': {
                  backgroundColor: theme.palette.background.paper,
                }
              }}
              size={isMobile ? "medium" : "small"}
              onClick={(e) => {
                e.stopPropagation();
                toggleImageZoom();
              }}
            >
              {imageZoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
            </IconButton>

            {/* Brand Badge */}
            {product.brand && (
              <Chip
                label={product.brand}
                size="small"
                sx={{
                  position: 'absolute',
                  top: isMobile ? 4 : 8,
                  left: isMobile ? 4 : 8,
                  backgroundColor: alpha(theme.palette.primary.main, 0.9),
                  color: 'white',
                  fontWeight: 500,
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                }}
              />
            )}
          </Box>

          {/* Product Details Section */}
          <Box
            sx={{
              flex: isMobile ? 'none' : 1,
              p: isMobile ? 2 : 3,
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? 1.5 : 2,
              maxHeight: isMobile ? '50vh' : 'none',
              overflowY: isMobile ? 'auto' : 'visible',
            }}
          >
            {/* Product Name */}
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="h1"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                lineHeight: 1.3,
                fontSize: isMobile ? '1.1rem' : '1.5rem',
              }}
            >
              {product.name}
            </Typography>

            {/* Availability Status */}
            <Chip
              icon={getAvailabilityIcon(product.availability)}
              label={product.availability.replace('-', ' ').toUpperCase()}
              sx={{
                alignSelf: 'flex-start',
                backgroundColor: alpha(getAvailabilityColor(product.availability), 0.1),
                color: getAvailabilityColor(product.availability),
                fontWeight: 600,
                fontSize: '0.8rem',
              }}
            />

            <Divider />

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
              }}
            >
              {product.description}
            </Typography>

            {/* Category & Subcategory */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Category
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={product.category.replace('_', ' ').toUpperCase()}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
                {product.subcategory && (
                  <Chip
                    label={product.subcategory}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Stack>
            </Box>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Key Features
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {product.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontSize: '0.75rem',
                        mb: 1,
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Price (if available) */}
            {product.price && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Price
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  }}
                >
                  {product.price.min && product.price.max
                    ? `₹${product.price.min} - ₹${product.price.max}`
                    : product.price.min
                    ? `₹${product.price.min}`
                    : 'Price on Request'
                  }
                </Typography>
              </Box>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Tags
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {product.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={`#${tag}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.7rem',
                        height: 24,
                        mb: 0.5,
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
