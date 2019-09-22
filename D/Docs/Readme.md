
# D

## Description


## Links

_WWW_

_Wiki_


## Keywords
~~~
   A RegEx to find them all:

       \b(?!(?-i:
       )\b)
~~~


## Identifiers


## String Literals

### Single quoted

### Double quoted

### Document String - Double or Single Triple-Quoted

### Backslash quoted


## Comment

### Single line comment

### Multi line comment

### Block comment

### Java Doc

### Here Doc

### Now Doc


## Classes & Methods


## Function


## Grammar

BNF | ABNF | EBNF | XBNF
[D] ----------------------------------------------------------------------------
@=D

_WWW_=http://dlang.org/

_Wiki_=https://en.wikipedia.org/wiki/D_(programming_language)

Keywords=

   abstract   alias   align   asm   assert   auto
   body   bool   break   byte
   case   cast   catch   cdouble   cent   cfloat   char   class   const   continue   creal
   dchar   debug   default   delegate   delete (deprecated)   deprecated   do   double
   else   enum   export   extern
   false   final   finally   float   for   foreach   foreach_reverse   function
   goto
   idouble   if   ifloat   immutable   import   in   inout   int   interface   invariant   ireal   is
   lazy   long
   macro (unused)   mixin   module
   new   nothrow   null
   out   override
   package   pragma   private   protected   public   pure
   real   ref   return
   scope   shared   short   static   struct   super   switch   synchronized
   template   this   throw   true   try   typedef (deprecated)   typeid   typeof
   ubyte   ucent   uint   ulong   union   unittest   ushort
   version   void   volatile (deprecated)
   wchar   while   with
   __FILE__   __FILE_FULL_PATH__   __MODULE__   __LINE__   __FUNCTION__   __PRETTY_FUNCTION__
   __gshared   __traits   __vector   __parameters


   Special Tokens

   These tokens are replaced with other tokens according to the following table:

       Special Token   Replaced with
       __DATE__        string literal of the date of compilation "mmm dd yyyy"
       __EOF__         sets the scanner to the end of the file
       __TIME__        string literal of the time of compilation "hh:mm:ss"
       __TIMESTAMP__   string literal of the date and time of compilation "www mmm dd hh:mm:ss yyyy"
       __VENDOR__      Compiler vendor string, such as "Digital Mars D"
       __VERSION__     Compiler version as an integer, such as 2001


   A RegEx to find them all:

       \b(?!(?-i:
       )\b)

Identifiers=http://dlang.org/spec/lex.html#identifiers

StringLiterals=http://dlang.org/spec/lex.html#string_literals

Comment=http://dlang.org/spec/lex.html#comment

Classes_and_Methods=http://dlang.org/spec/class.html

   http://dlang.org/spec/interface.html

Function=

Grammar=http://dlang.org/spec/grammar.html
