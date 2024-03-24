import HomeFilter from "../components/Home/HomeFilter";
import Events from "../components/Home/Events";
import Heading from "../UI/Heading";
import { useState } from "react";
import { useGetEvents } from "../hooks/Events/useGetEvents";
import Pagination from "../components/Home/Pagination";

const Home = () => {
  const [filterParams, setFilterParams] = useState([]);
  const { data, isLoading, refetch } = useGetEvents(filterParams);

  const events = data?.data;
  const page = data?.page;
  const pages = data?.pages;

  const handleFilter = (filters) => {
    setFilterParams(filters);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setFilterParams({ ...filterParams, page: newPage });
    refetch();
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="p-10 h-full ">
      <Heading>Home</Heading>
      <HomeFilter onFilter={handleFilter} />
      <Events data={events} />
      {pages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
