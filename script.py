from browser import document, window
from  pyweb3d.pyweb3d import *

# the required libraries are loaded in the html page. Ignore the "not defined" warnings.

# select the canvas to render the object
canvas = document.querySelector('.webgl')

# initialize and prepare the 3D scene
scene = Scene()
renderer = WebGLRenderer()
# renderer = WebGLRenderer({canvas})
renderer.setSize( window.innerWidth, window.innerHeight )

# resize handler
def onWindowResize(resize):
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize( window.innerWidth, window.innerHeight )

window.addEventListener( 'resize', onWindowResize )

document.body.appendChild( renderer.domElement )

# define the geometry and material
geometry = SphereGeometry( 4, 16, 16 )
material = MeshLambertMaterial(
        {
        'color': 0x772667
        }
    )

#  create and add the Mesh object
meshObj = Mesh( geometry, material )
scene.add( meshObj )

# add lighting to display the mesh object
light = PointLight(0xFFFFFF)
light.position.set(-10, 15, 50)
scene.add( light )

# add camera with appropriate field of view
camera = PerspectiveCamera( 45,
                           window.innerWidth / window.innerHeight,
                           0.1,
                           1000)
camera.position.z = 20
# # is this required?
# scene.add(camera)

# follow window resize
window.addEventListener('resize',())

# START FUNCTION DEFINITIONS
def animate(time):
	"""
	main function to animate the object.
	Ideally, this should be the only "non-pure" function that uses/modifies variables beyond its context.
	"""
	window.requestAnimationFrame( animate )
	meshObj.rotation.x += 0.01
	meshObj.rotation.y += 0.01
	renderer.render( scene, camera )
		
def isWebGLAvailable():
	try:
		canvas = document.createElement( 'canvas' )
		return not ( window.WebGLRenderingContext and ( canvas.getContext( 'webgl' ) | canvas.getContext( 'experimental-webgl' ) ) )
	except:
		return False

def isWebGL2Available():
	try:
		canvas = document.createElement( 'canvas' )
		return not ( window.WebGL2RenderingContext and canvas.getContext( 'webgl2' ) )
	except:
		return False

def getErrorMessage( version ):
	names = {
		1: 'WebGL',
		2: 'WebGL 2'
		}
	contexts = {
		1: window.WebGLRenderingContext,
		2: window.WebGL2RenderingContext
		}
	message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>'
	element = document.createElement( 'div' )
	element.id = 'webglmessage'
	element.style.fontFamily = 'monospace'
	element.style.fontSize = '13px'
	element.style.fontWeight = 'normal'
	element.style.textAlign = 'center'
	element.style.background = '#fff'
	element.style.color = '#000'
	element.style.padding = '1.5em'
	element.style.width = '400px'
	element.style.margin = '5em auto 0'

	if contexts[ version ]:
		message = message.replace( '$0', 'graphics card' )
	else:
		message = message.replace( '$0', 'browser' )

	message = message.replace( '$1', names[ version ] )
	element.innerHTML = message

	return element

def getWebGLErrorMessage():
	return getErrorMessage( 1 )

def getWebGL2ErrorMessage():
	return getErrorMessage( 2 )

def resize_canvas():
	# get the current window size
	return {
		"width": window.innerWidth,
		"height": window.innerHeight
	}

# END FUNCTION DEFINITIONS

if isWebGLAvailable():
	# animate only if required WebGL is supported
	animate(0)
else:
	warning = getWebGLErrorMessage()
	try:
		document.getElementById( 'container' ).appendChild( warning )
	except:
		container = document.createElement('div')
		container.appendChild(warning)
		document.body.appendChild(container)
		
