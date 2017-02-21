// Phong lighting in eye coordinates with texture access.

// These are set by the .vert code, interpolated.
varying vec3 ec_vnormal, ec_vposition;
varying vec2 textureCoords;

// This is set by the .c code.
uniform sampler2D mytexture;

void main()
{
	vec3 P, N, L, V, H;

	vec4 diffuse[3];

	diffuse[0] = gl_FrontMaterial.diffuse * gl_LightSource[0].diffuse;
	vec4 specular_color = gl_FrontMaterial.specular * gl_LightSource[0].specular;
	float shininess = gl_FrontMaterial.shininess;
	
	P = ec_vposition;
	N = normalize(ec_vnormal);
	L = normalize(gl_LightSource[0].position - P);
	V = normalize(-P);
	H = normalize(L+V);

	vec4 tcolor;
	tcolor = texture2D(mytexture, textureCoords);
		
	diffuse[0] *= max(dot(N,L),0.1);
	specular_color *= pow(max(dot(H,N),0.0),shininess);
	
    gl_FragColor = vec4(((diffuse[0] * tcolor) + specular_color).xyz, 1.0);
}
