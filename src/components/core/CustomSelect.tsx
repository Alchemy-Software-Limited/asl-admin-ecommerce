import { Box, Checkbox, List, ListItem, ListItemButton, ListItemText, Skeleton, TextField, useTheme } from '@mui/material';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'src/redux/selector';

// Define types for the props
interface Option {
    _id: string;
    groupName: string;
}

interface CustomSelectProps {
    options: Option[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLoading: boolean;
    selectedOption: Option[];
    handleSelection: (option: Option, checked: boolean) => void;
    toggleDropDown: boolean;
    setToggleDropDown: (toggle: boolean) => void;
    placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    setSearchQuery,
    searchQuery,
    isLoading,
    selectedOption,
    toggleDropDown,
    setToggleDropDown,
    handleSelection,
    placeholder = 'Search...'
}: CustomSelectProps) => {
    const customization = useSelector(selectCurrentMode);

    const theme = useTheme();
    const handleToggleDropDown = () => {
        setToggleDropDown(!toggleDropDown);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box
                sx={{
                    position: 'relative',
                    marginBottom: theme.spacing(1),
                    width: '100%'
                }}
            >
                <TextField
                    placeholder={placeholder}
                    size="small"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    fullWidth
                />
                <Box
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: customization.mode === 'dark' ? 'secondary.dark' : theme.palette.grey[400]
                    }}
                    onClick={handleToggleDropDown}
                >
                    {!toggleDropDown ? <MdArrowDropDown size={32} /> : <MdArrowDropUp size={32} />}
                </Box>
            </Box>
            {(toggleDropDown || searchQuery) && (
                <>
                    {isLoading ? (
                        <Box sx={{ width: '100%' }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    ) : (
                        <List
                            dense
                            sx={{
                                width: '100%',
                                backgroundColor: '#ebebeb',
                                borderRadius: theme.spacing(1),
                                maxHeight: theme.spacing(15),
                                border: '1px solid #b6b6b6',
                                padding: theme.spacing(1),
                                overflowY: 'scroll',
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#e9e9e9',
                                    display: 'none',
                                    borderRadius: '10px'
                                },
                                scrollbarWidth: 'none',
                                '-ms-overflow-style': 'none',

                                '&::-webkit-scrollbar': {
                                    width: '0.2em'
                                }
                            }}
                        >
                            {options?.map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value._id}`;
                                return (
                                    <ListItem
                                        key={value._id}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                                onChange={(e) => handleSelection(value, e.target.checked)}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                // eslint-disable-next-line react/prop-types
                                                checked={selectedOption?.some((opt) => opt._id === value._id)}
                                            />
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <ListItemText id={labelId} primary={value.groupName} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </>
            )}
        </Box>
    );
};

export default CustomSelect;
