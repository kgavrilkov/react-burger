import React, { FC } from "react";
import Heading from "./heading/heading";
import Main from "./main/main";
import TabFeed from "./tab-feed/tab-feed";
import { TFeed } from '../../utils/types';

const Feed: FC<TFeed> = ({ isOrdersVisible, isStatsVisible, handleOrdersToggle, handleStatsToggle }) => {
  return(
    <>
      <Heading />
      <TabFeed handleOrdersToggle={handleOrdersToggle} handleStatsToggle={handleStatsToggle} />
      <Main isOrdersVisible={isOrdersVisible} isStatsVisible={isStatsVisible} />
    </>
  );
}

export default Feed;