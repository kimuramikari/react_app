import Head from 'next/head';
import Header from './header';
import Footer from './footer';

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
          crossorigin="anonymous"
        ></link>
      </Head>
      <Header header={props.header} />
      <div className="container">
        <h3 className="my-3 text-primary text-center">{props.title}</h3>
        {props.children}
      </div>
      <Footer footer="&copy; KIMURA" />
    </div>
  );
}