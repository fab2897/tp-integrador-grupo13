export const ContenidoPrincipal = () => {
  return (
    <div className="contenedor-central">
      <section className="seccion-proyectos">
        <article className="tarjeta">
          <h2>Sección de Proyectos</h2>
          <p>Aquí irán las tablas o tarjetas de tu proyecto final.</p>
        </article>
        
        <article className="tarjeta">
          <h2>Otro Proyecto</h2>
          <p>Detalles del segundo proyecto.</p>
        </article>
      </section>

      <aside className="barra-lateral">
        <h3>Información extra</h3>
        <p>Aquí puedes poner un buscador, filtros o enlaces rápidos.</p>
      </aside>
    </div>
  );
};