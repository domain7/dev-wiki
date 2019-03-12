# Domain 7 Dev Wiki
This is the Domain 7's development team wiki. It can be found [here](http://domain7.github.io/dev-wiki/).

# Team
Maintainer:

* [Reuben Moes](https://github.com/reubenmoes)

Contributors:

* [Colin Calnan](https://github.com/colincalnan)
* [Joe Flynn](https://github.com/joeflynn)
* [Lance Janocha](https://github.com/lancejanocha)
* [Igor Barbashin](https://github.com/igorbarbashin)
* [Nicholas Monfils](https://github.com/nmwd)
* [Anna Kviese](https://github.com/annakviese)
* [Jason Au](https://github.com/jasontau)

# Setup
To get the Dev Wiki up and running, you will need:

* Ruby: you can use [RVM](https://rvm.io/rvm/install) or [rbenv](https://github.com/rbenv/rbenv)
* [Bundler](http://bundler.io/): `gem install bundler`
* [Jekyll](https://jekyllrb.com/): `gem install jekyll`

# Run
```
jekyll serve
```
    - Did that not command run into errors? Try ``` bundle exec jekyll serve```

# Process
To create a new entry into the wiki, create a feature branch specific to your changes off of the main branch (`git checkout -b feature/my-changes.`)

Once your changes are done, create a [Pull Request](https://github.com/domain7/dev-wiki/pulls).

When the pull request is approved and merged, the wiki will update itself on http://domain7.github.io/dev-wiki/
