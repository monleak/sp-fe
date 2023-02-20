import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import exp from 'constants';
export type Target = {
    value: any,
    name: string
}
export type MySelectProps = {
    title: string
    onChange: (value: any) => any
    event: Target[]
}
export default function MySelect(props: MySelectProps) {
    const [value, setValue] = React.useState(props.event[0].value);
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
        props.onChange(event.target.value);
    };
    let menuItems = [];
    for (let index = 0; index < props.event.length; index++) {
        const element = props.event[index];
        menuItems.push(<MenuItem key={element.value} value={element.value}>{element.name}</MenuItem>);
    }
    return (
        <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
                <InputLabel>{props.title}</InputLabel>
                <Select
                    value={value}
                    label={props.title}
                    onChange={handleChange}
                    defaultValue="1"
                >
                    {menuItems}
                </Select>
            </FormControl>
        </Box>
    );
}