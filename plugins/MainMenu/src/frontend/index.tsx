import { TFrontendPluginProps } from '@cromwell/core';
import { Link } from '@cromwell/core-frontend';
import { MenuItem, Popover } from '@material-ui/core';
import React, { useState } from 'react';

import { TMainMenuSettings } from '../types';
import { useStyles } from './styles';


const MainMenu = (props: TFrontendPluginProps<null, TMainMenuSettings>) => {
    const classes = useStyles();
    const items = props?.settings?.items ?? [];
    const [activeItem, setActiveItem] = useState<string>('none');
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setActiveItem('none');
    };
    return (
        <div className={classes.menuList}>
            {items.map((i, index) => {
                const isActive = activeItem === i.title;
                const menuItem = (
                    <MenuItem className={classes.listItem}
                        key={index}
                        onMouseLeave={handlePopoverClose}
                        onMouseOver={(e) => {
                            handlePopoverOpen(e);
                            setActiveItem(i.title);
                        }}
                    >
                        <p>{i.title}</p>
                        {(i.sublinks || i.html) && (
                            <Popover
                                id={i.title}
                                open={isActive}
                                anchorEl={anchorEl}
                                className={classes.popover}
                                classes={{
                                    root: classes.popover,
                                    paper: classes.paper
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}

                                onClose={handlePopoverClose}
                            >
                                <div style={{
                                    // width: i.width ? `${i.width}px` : undefined
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${i.sublinkCols ? i.sublinkCols : 1}, 1fr)`
                                }}>
                                    {i.sublinks && i.sublinks.map((sub, subIndex) => {
                                        return (
                                            <MenuItem
                                                style={{
                                                    // width: i.sublinkCols ? `${100 / i.sublinkCols}px` : '100%'
                                                }}
                                                key={subIndex}
                                            ><Link href={sub.href + ''}><p>{sub.title}</p></Link></MenuItem>
                                        )
                                    })}
                                </div>
                            </Popover>
                        )}
                    </MenuItem>
                )
                if (i.href) {
                    return <Link href={i.href} key={index}><a>{menuItem}</a></Link>
                }
                return menuItem;

            })}
        </div>
    )
}

export default MainMenu;
