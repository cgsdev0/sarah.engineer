module Jekyll

  Jekyll::Hooks.register :site, :post_write do |post|

      post.posts.docs.each do |post|
          filename = post.site.dest + post.id + ".md"
          dirname = File.dirname(filename)
          Dir.mkdir(dirname) unless File.exists?(dirname)

          File.write(filename, post.raw_contents)
      end
  end

end
