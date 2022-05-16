import { useGlobalStore } from '@/context/GlobalStore';
import { ParentWrapper } from '@/layouts/wrapper';
import { Box, Stack } from '@mui/material';
import { CategoryDropdown } from './dropdown';

export const CategoryRow = () => {
  const {
    state: { categories },
  } = useGlobalStore();

  return (
    <Box sx={{ backgroundColor: '#F9F9F9', paddingY: 1 }}>
      <ParentWrapper>
        <Stack direction='row' spacing={1}>
          {categories.map((category) => (
            <CategoryDropdown key={category.ID} category={category} />
          ))}
        </Stack>
      </ParentWrapper>
    </Box>
  );
};
