<h1>Api</h1>

<h2>Commands</h2>
<br>
<h3>Create an migration</h3>
<pre>
  yarn typeorm migration:create -n <name>
</pre>

<h3>Execute migrations</h3>
<pre>
  yarn typeorm migration:run  
</pre>

<h3>Revert last migration</h3>
<pre>
  yarn typeorm migration:revert    
</pre>

<br>
<h2>Getting started</h2>
<br>

<h3>Start database container</h3>
<pre>
  docker-compose up
</pre>

<h3>Install all dependences</h3>
<pre>
  yarn
</pre>

<h3>Run all migrations</h3>
<pre>
  yarn typeorm migration:run
</pre>

<h3>Start the server</h3>
<pre>
  yarn dev
</pre>

<h3>The server is running on port 3333</h3>

