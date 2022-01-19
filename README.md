<h1>Full stack boilerplate</h1>
<p>This is a boilerplate created with authentication implemented with JWT refresh token strategy in front-end and back-end</p>

<h2>Backend</h2>
<p><a href="https://github.com/massaaki/auth-with-next-and-node/tree/main/api">Access backend application</a></p>
<p>Built with Node.js + typescript + express and using clean architecture concepts trying to ensure SOLID principes</p>

<h3>Layers</h3>
<ul>
  <li>Domain: Models and useCases protocols</li>
  <li>Application: Business rules implementation</li>
  <li>Presentation: Implements controllers</li>
  <li>Infrastructure: external libraries adapters</li>
  <li>Main: Consolidate all layers</li>
</ul>

<h2>Frontend</h2>
<p><a href="https://github.com/massaaki/auth-with-next-and-node/tree/main/app">Access frontend application</a></p>
<p>Built with Next.js + typescript with axios interceptors configuration to treat refresh token</p>

<h3>Structure</h3>
<ul>
  <li>Created Auth context to manage user credentials</li>
  <li>Configured interceptors to deal with expires token and queue requests to be resolved after refresh token if needed</li>
</ul>