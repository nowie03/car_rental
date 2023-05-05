import { Flex,IconButton,Icon,SearchField } from "gestalt";

export default function SearchFieldExample() {
    const [value, setValue] = React.useState('');

    return (
      <Flex gap={{ row: 4, column: 0 }} alignItems="center" flex="grow">
        <Icon
          icon="pinterest"
          color="brandPrimary"
          size={20}
          accessibilityLabel="Pinterest"
        />
        <Flex.Item flex="grow">
          <SearchField
            accessibilityLabel="Search all of Pinterest"
            accessibilityClearButtonLabel="Clear search field"
            id="searchFieldMainExample"
            onChange={({value}) => setValue(value)}
            placeholder="Search and explore"
            value={value}
          />
        </Flex.Item>
        <IconButton
          accessibilityLabel="Notifications"
          icon="speech-ellipsis"
          size="md"
        />
        <IconButton accessibilityLabel="Profile" icon="person" size="md" />
      </Flex>
    );
  }