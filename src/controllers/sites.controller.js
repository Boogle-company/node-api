
class SitesController {
  async home(req, res, next) {
    res.render("home/home", {
      totalSites: 10,
      currentPage: 1,
      totalPages: 10,
      sites: [
        {
          _id: "1",
          name: "Google",
          url: "https://www.google.com",
          description: "Search engine",
          tags: ["search", "engine"],
        },
        {
          _id: "2",
          name: "Facebook",
          url: "https://www.facebook.com",
          description: "Social media",
          tags: ["social", "media"],
        },
        {
          _id: "3",
          name: "Instagram",
          url: "https://www.instagram.com",
          description: "Social media",
          tags: ["social", "media"],
        },
        {
          _id: "4",
          name: "Twitter",
          url: "https://www.twitter.com",
          description: "Social media",
          tags: ["social", "media"],
        },
        {
          _id: "5",
          name: "LinkedIn",
          url: "https://www.linkedin.com",
          description: "Social media",
          tags: ["social", "media"],
        },
        {
          _id: "6",
          name: "YouTube",
          url: "https://www.youtube.com",
          description: "Social media",
          tags: ["social", "media"],
        },

      ]
    });
  }
}

module.exports = new SitesController();
