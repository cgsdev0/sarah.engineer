module RawContent
  class Generator < Jekyll::Generator
    def generate(site)
      site.pages.each do |page|
        page.data['raw_contents'] = page.content
      end
      site.posts.docs.each do |post|
        post.data['raw_contents'] = post.content
      end
    end
  end
end
