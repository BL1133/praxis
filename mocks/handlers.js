const { http } = require('msw');

const handlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`,
    (req, res, ctx) => {
      const query = req.url.searchParams.get('tags');
      if (query) {
        // Return filtered projects based on the query
        return res(
          ctx.json({ projects: [{ id: 1, name: 'Filtered Project' }] }),
        );
      }
      // Return all projects if no query is provided
      return res(
        ctx.json({
          projects: [
            { id: 2, name: 'Project 1' },
            { id: 3, name: 'Project 2' },
          ],
        }),
      );
    },
  ),
];

module.exports = handlers;
