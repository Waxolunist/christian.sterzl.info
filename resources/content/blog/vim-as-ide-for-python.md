---
author: Christian Sterzl
date: 2015-04-16
title: Vim as IDE for Python
tags: vim python
draft: false
---

<img class="img-top-center" src="/assets/blog/pythonide.gif"/>

# Using Vim as IDE for Python

## Motivation

I like using Vim for all my development activities, especially for typing text or writing
small scripts. Currently, I am developing some REST services with [flask](http://flask.pocoo.org/) 
which is a small and handy Python framework for developing web applications and REST services.

Therefore, I have decided to extend my Vim configuration for use with Python. My Vim configuration 
is already under version control for years and is currently available on 
[github](https://github.com/Waxolunist/vimconf).

## Plugins

To my surprise, I already had most plugins installed and only needed to turn my Vim into an IDE for Python.
For this How-To I chose the following plugins:

* [NERDTree](https://github.com/scrooloose/nerdtree): Filesystem Browser
* [MiniBufExpl](https://github.com/fholgado/minibufexpl.vim): Show open buffers
* [Tagbar](https://github.com/majutsushi/tagbar): Outline
* [Sensible](https://github.com/tpope/vim-sensible): Defaults everybody can agree on
* [syntastic](https://github.com/scrooloose/syntastic): Common Syntax checker 
* [vim-polyglot](https://github.com/sheerun/vim-polyglot): Syntax highlighting, indentation support
* [ultisnips](https://github.com/SirVer/ultisnips): Snippet engine for Vim
* [vim-snippets](https://github.com/honza/vim-snippets): Snippets for various programming languages
* [YouCompleteMe](https://github.com/Valloric/YouCompleteMe): Code completion engine

Vim-polyglot, tagbar, syntastic and YouCompleteMe are plugins covering a lot more languages than 
just Python, but having more common plugins in place is convenient when switching to other languages.

Usually, I load plugins with [pathogen](https://github.com/tpope/vim-pathogen) and install them as 
git submodules into the folder bundle.

## External requirements

### Python

Of course you need Python installed. The minimum Python version is 2.6 altough I only tested this 
configuration with Python 2.7.9.

You can determine your Python version with the following command:

```bash
$ python --version
Python 2.7.9
```

### Exuberant Ctags

In order to present the outline of Python files I use the tagbar plugin. The tagbar plugin uses the 
output of the [exuberant ctags](http://ctags.sourceforge.net/) library. At least version 5.5 is 
required.

Installation is done with the package manager of your distribution or with brew if you are running 
Mac OS X.

### Pylint

Syntastic uses external syntax checkers. For Python [pylint](http://www.pylint.org/) is the state 
of the art syntax checker. Either install it with the package manager of your distribution or 
alternatively with pip. See the installation instructions of pylint 
[here](http://www.pylint.org/#install).

### YouCompleteMe

YouCompleteMe is a plugin with compiled content. Therefore, it requires an extra installation step 
after downloading. Please refer to the installation instructions provided on the homepage of the 
plugin: [https://github.com/Valloric/YouCompleteMe](https://github.com/Valloric/YouCompleteMe).

## Vim requirements

The minimum Vim version supported by the above plugins is 7.3.

Vim needs to be compiled with Python support (the `+python` flag). The Python version compiled into 
Vim must be at least 2.6. You can test this by typing:

```bash
:python import sys; print sys.version
2.7.9 (default, Mar  1 2015, 18:26:48)
[GCC 4.9.2]
```

YouCompleteMe uses internal jedi, which is an autocomplete library for Python. Thus Vim should be 
compiled with the `+conceal` flag. If Vim is not compiled with this flag, the parameter 
recommendation list may not appear when typing open brackets.

To see which compile flags were used type `:version`.

## Testing the Configuration

To test the above configuration I installed Vim and the named plugins on a clean 
[LMDE2 (Linux Mint Debian 2)](http://www.linuxmint.com/download_lmde.php) installation, which is 
based on Debian Jessie.

### Installation 

By default, Vim will be delivered in a compact version (vim-tiny). This version is not compiled 
with the `+conceal` flag or the `+python` flag, thus I installed a Vim version with scripting 
support, which is under debian called vim.nox.

Python comes already preinstalled in version 2.7.9.

When installing Vim plugins I usually clone the github repository of that plugin and load them 
with pathogen, thus I need to install git as well.

To compile YouCompleteMe I needed the Python headers, cmake and the build-essentials.

To install all of the above type:

```bash
$ sudo apt-get install vim-nox pylint git exuberant-ctags build-essential cmake python-dev libclang1
```

### Configuring Vim

When it comes to Vim plugins I like to install them directly in my home directory rather than 
using the version delivered by the operating system, altough some plugins are available in the 
package repositories of Debian Jessie.

As I already mentioned I am installing Vim plugins usually by cloning the repository of that plugin 
and loading it then with pathogen. More sophisticated plugin managers exist which support lazy 
loading like [NeoBundle](https://github.com/Shougo/neobundle.vim). But for testing the pathogen 
package manager is a good fit.

First, I installed pathogen.

```bash
$ mkdir -p ~/.vim/autoload
$ curl https://raw.githubusercontent.com/tpope/vim-pathogen/v2.3/autoload/pathogen.vim -o ~/.vim/autoload/pathogen.vim
```

To actually load pathogen, the first line of your Vim runtime configuration `.vimrc` needs to load 
pathogen. So add this to your `.vimrc`:

```vim
execute pathogen#infect()
```

Then I cloned the plugins chosen above into the directory `bundle` under my Vim configuration 
directory `.vim`.


```bash
$ mkdir -p ~/.vim/bundle
$ git clone https://github.com/scrooloose/nerdtree ~/.vim/bundle/nerdtree
$ git clone https://github.com/fholgado/minibufexpl.vim ~/.vim/bundle/minibufexpl
$ git clone https://github.com/majutsushi/tagbar ~/.vim/bundle/tagbar
$ git clone https://github.com/tpope/vim-sensible ~/.vim/bundle/sensible
$ git clone https://github.com/scrooloose/syntastic ~/.vim/bundle/syntastic
$ git clone https://github.com/sheerun/vim-polyglot ~/.vim/bundle/polyglot
$ git clone https://github.com/Valloric/YouCompleteMe ~/.vim/bundle/youcompleteme
$ git clone https://github.com/SirVer/ultisnips ~/.vim/bundle/ultisnips
$ git clone https://github.com/honza/vim-snippets ~/.vim/bundle/vimsnippets
```

After cloning YouCompleteMe the final installation step is to execute the installation script. 
Because debian is not shipped with the exact symlinks YouCompleteMe expects, I had first to create 
the symlinks by myself:

```bash
$ cd /usr/lib/llvm-3.5/lib/
$ sudo ln -s libclang.so.1 libclang.so 
$ cd ~/.vim/bundle/youcompleteme
$ git submodule update --init --recursive
$ ./install.sh --clang-completer --system-libclang
```

Other compiler options like `--omnisharp-completer` for C# completion are available, but I don't 
need that for now.

My `.vimrc`:

```vim
" ---------------------------------- "
" Pathogen
" ---------------------------------- "

" Load plugins with pathogen
execute pathogen#infect()
execute pathogen#helptags()

" ---------------------------------- "
" Configure NERDTree
" ---------------------------------- "

" Open NERDTree when Vim startsup and no files were specified
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif

" Open NERDTree with Ctrl-n 
map <C-n> :NERDTreeToggle<CR>

" Close Vim if the only window left open is NERDTree
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType") && b:NERDTreeType == "primary") | q | endif

" ---------------------------------- "
" Configure MiniBufExpl
" ---------------------------------- "
 
" Open MiniBufExpl with Ctrl-m
map <C-m> :MBEToggle<CR>

" ---------------------------------- "
" Configure Tagbar
" ---------------------------------- "

" Open Tagbar with F8
map <F8> :TagbarToggle<CR>

" ---------------------------------- "
" Configure Ultisnip and YouCompleteMe
" ---------------------------------- "

let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<tab>"
let g:UltiSnipsJumpBackwardTrigger="<s-tab>"

" ---------------------------------- "
" Configure YouCompleteMe
" ---------------------------------- "

let g:ycm_collect_identifiers_from_tags_files = 1 " Let YCM read tags from Ctags file
let g:ycm_use_ultisnips_completer = 1 " Default 1, just ensure
let g:ycm_seed_identifiers_with_syntax = 1 " Completion for programming language's keyword
let g:ycm_complete_in_comments = 1 " Completion in comments
let g:ycm_complete_in_strings = 1 " Completion in string

let g:ycm_key_list_select_completion = ['<C-j>', '<Down>']
let g:ycm_key_list_previous_completion = ['<C-k>', '<Up>']

" Goto definition with F3
map <F3> :YcmCompleter GoTo<CR>


" ---------------------------------- "
" Common
" ---------------------------------- "

" Python shiftwidth, tabstop, softtabstop
autocmd FileType python set sw=4
autocmd FileType python set ts=4
autocmd FileType python set sts=4

" Show linenumbers
set number

" set mapleader to a easier typable key
let mapleader = ","
```

### Shortcuts

In the following I will list some of the most important shortcuts just added. 
For more shortcuts refer to the plugin documentation.

* F8 - Toggle Tagbar
* Ctrl-m - Toggle Minibufexpl
* Ctrl-n - Toggle NERDTree
* Ctrl-space - Show autocomplete menu for Python code
* F3 - Goto definition
* Tab - Complete / Jump to next completion mark
* Shift-Tab - Jump to last completion mark

### Additional Resources

You can find additional snippets on github. I added [http://vim.wikia.com/wiki/Script:2715](these).

## Final Words

This configuration is just a first step. I saw while writing this post  
other useful settings and plugins worth trying and writing about.
