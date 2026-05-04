import Head from "next/head";

const Home: React.FC = () =>{
  return(
    <div>
      <Head>
        <title>Vendas app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      Bem Vindo!

      <button className="button is-black">Black</button>
    </div>
  );
}
export default Home;

