import sitemap from 'routes/sitemap';
import SearchBox, { SearchBoxButton as BaseSearchBoxButton } from './SearchBox';

const WorkspaceSearchBox = (props) => <SearchBox navigation={sitemap} {...props} />;

export const SearchBoxButton = (props) => <BaseSearchBoxButton navigation={sitemap} {...props} />;

export default WorkspaceSearchBox;
