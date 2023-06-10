const createResourceHal = (resource, schema, page, limit) => {
   const resourceName = Object.keys(schema)[0]
   const identifier = schema[resourceName]
   const offset = (page - 1) * limit
   const resourceMapped = resource.slice(offset, offset + +limit)

   const resourceHal = resourceMapped.map((resource) => {
      return {
         _links: {
            self: {
               href: `/api/v1/${resourceName}/${resource[identifier]}`,
            },
         },
         id: resource[identifier],
         name: resource.nombre || resource.descripcion,
      }
   })


   /* co pag */
   const _links = (() => {
      const prev = page > 1 ? `http://localhost:3000/api/v1/${resourceName}?page=${page - 1}&limit=${limit}` : null
      const next =
         page < Math.ceil(resource.length / limit)
            ? `http://localhost:3000/api/v1/${resourceName}?page=${Number(page) + 1}&limit=${limit}`
            : null
      return {
         self: {
            href: `http://localhost:3000/api/v1/${resourceName}?page=${page}&limit=${limit}`,
         },
         first: {
            href: `http://localhost:3000/api/v1/${resourceName}?page=1&limit=${limit}`,
         },
         prev,
         next,
         last: {
            href: `http://localhost:3000/api/v1/${resourceName}?page=${Math.ceil(
               resource.length / limit
            )}&limit=${limit}`,
         },
      }
   })()
   return {
      _links,
      count: Number(limit),
      total: resource.length,
      _embedded: {
         [resourceName]: resourceHal,
      },
   }
}

/* exportacion de modulos */
module.exports = {
   createResourceHal,
}