using Distributions
using JSON

mu = 0
beta = 0.4
d = Gumbel( mu,beta )

x = linspace( -100, 100, 400 )

dmgf(t) = mgf(d, t )
y = map( dmgf, x )
println( y )

data = Dict([
	("mu", mu),
	("beta", beta),
	("data", x),
	("expected", y)
])

outfile = open("./test/fixtures/typedarray.json", "w")
JSON.json(data)

write( outfile, JSON.json(data) )
