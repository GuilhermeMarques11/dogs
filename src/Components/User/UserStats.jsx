import React from 'react';
import Head from '../Helper/Head';
import userFetch from '../../Hooks/useFetch';
import { STATS_GET } from '../../api';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';
const UserStatsGraphs = React.lazy(() => import ('./UserStatsGraphs'));

const UserStats = () => {
  const { data, error, loading, request } = userFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();
  }, [request]);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data && data.length > 0)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return <p>Não há estatísticas disponíveis.</p>;
};

export default UserStats;
