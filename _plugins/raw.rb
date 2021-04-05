module Jekyll

  Jekyll::Hooks.register :pages, :post_write do |page|

      if page.name.end_with?(".markdown")
          if page.url.end_with?('/')
            filename = page.site.dest + '/' + page.url + '/index.md'
          else
            filename = page.site.dest + '/' + page.url + '.md'
          end
          dirname = File.dirname(filename)
          Dir.mkdir(dirname) unless File.exists?(dirname)

          File.write(filename, page.data['raw_contents'])
      end
  end

  Jekyll::Hooks.register :site, :post_write do |post|

    post.posts.docs.each do |post|
        filename = post.site.dest + post.id + ".md"
        dirname = File.dirname(filename)
        Dir.mkdir(dirname) unless File.exists?(dirname)

        File.write(filename, post.raw_contents)
    end
  end

end
