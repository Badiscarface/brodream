import { merge } from 'lodash';
import Card from './card';
import Tabs from './tabs';
import Link from './link';
import Lists from './lists';
import Table from './table';
import Paper from './paper';
import Input from './input';
import Drawer from './drawer';
import Dialog from './dialog';
import Button from './button';
import Tooltip from './tooltip';
import Popover from './popover';
import Skeleton from './skeleton';
import Pagination from './pagination';
import ControlLabel from './controlLabel';

// ----------------------------------------------------------------------

export default function ComponentsOverrides({ ...theme }) {
  return merge(
    Tabs(theme),
    Card(theme),
    Link(theme),
    Input(theme),
    Lists(theme),
    Table(theme),
    Paper(theme),
    Button(theme),
    Dialog(theme),
    Drawer(theme),
    Tooltip(theme),
    Popover(),
    Skeleton(theme),
    Pagination(theme),
    ControlLabel(theme)
  );
}
